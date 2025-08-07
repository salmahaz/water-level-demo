"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import mqtt, { MqttClient } from "mqtt";
import { updateDistance } from "@/actions/tanks/updateDistance";

// Define the shape of the context value
interface MqttContextType {
  client: MqttClient | null;
  subscribe: (topic: string) => void;
  unsubscribe: (topic: string) => void;
  publish: (topic: string, message: string | Buffer) => void;
  payload: Record<string, any>;
}

// Create a context
const MqttContext = createContext<MqttContextType | null>(null);

// Tank type definition
interface MqttProviderProps {
  children: ReactNode;
  tanks: {
    _id: string;
    name: string;
    serialNumber: string;
    height: number;
    x: number;
  }[];
}

export const MqttProvider: React.FC<MqttProviderProps> = ({
  children,
  tanks,
}) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [payload, setPayload] = useState<Record<string, any>>({});

  useEffect(() => {
    const mqttClient = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL!, {
      protocolId: "MQTT",
      clientId: `user_${Math.random().toString(16).slice(2, 10)}`,
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      port: 8084,
      protocolVersion: 5,
      clean: false,
    });

    mqttClient.on("message", async (topic, message) => {
      try {
        const messageStr = message.toString();

        setPayload((prev) => ({
          ...prev,
          [topic]: messageStr,
        }));

        const serialNumber = topic.split("/")[0];
        const tank = tanks.find((t) => t.serialNumber === serialNumber);

        if (!tank) {
          console.warn(`[mqtt] no tank found for serial number: ${serialNumber}`);
          return;
        }

        const parsed = JSON.parse(messageStr);
        const rawDistance = Number(parsed?.distance);
        const sensorOffset = Number(tank?.x);

        if (isNaN(rawDistance) || isNaN(sensorOffset)) {
          console.warn("[mqtt] invalid distance or sensor offset:", {
            rawDistance,
            sensorOffset,
            serialNumber,
          });
          return;
        }

        const newDistance = Math.round(rawDistance / 10 - sensorOffset);

        console.log(
          `[mqtt] updating tank "${tank.name}" with distance: ${newDistance}`
        );

        await updateDistance(tank._id, newDistance);
      } catch (error) {
        console.error("[mqtt] error in message handler:", error);
      }
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, [tanks]);

  const subscribe = (topic: string) => {
    if (client) {
      client.subscribe(topic, { qos: 1 }, (err) => {
        if (!err) {
          setSubscriptions((prev) =>
            prev.includes(topic) ? prev : [...prev, topic]
          );
        } else {
          console.error("Subscription error:", err);
        }
      });
    }
  };

  const unsubscribe = (topic: string) => {
    if (client) {
      client.unsubscribe(topic, (err) => {
        if (!err) {
          setSubscriptions((prev) => prev.filter((t) => t !== topic));
        } else {
          console.error("Unsubscription error:", err);
        }
      });
    }
  };

  const publish = (topic: string, message: string | Buffer) => {
    if (client) {
      client.publish(topic, message, (err) => {
        if (err) {
          console.error("Publish error:", err);
        }
      });
    }
  };

  return (
    <MqttContext.Provider
      value={{ client, subscribe, unsubscribe, publish, payload }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqttContext = (): MqttContextType => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error("useMqttContext must be used within an MqttProvider");
  }
  return context;
};
