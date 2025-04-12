/**
 * Google Chart Drawing Code
 */
google.charts.load("current", { packages: ["gauge"] });
google.charts.setOnLoadCallback(drawChart);

/**
 * MQTT configuration
 */
const clientId = "mqttjs_" + Math.random().toString(16).substring(2, 8);
const connectUrl =
  "wss://00292c2d29724ec08a8ce3ea4f399dc6.s1.eu.hivemq.cloud:8884/mqtt";

const options = {
  keepalive: 60,
  clientId: clientId,
  clean: true,
  connectTimeout: 30 * 1000,
  username: "chathura94",
  password: "Abc@1234",
  reconnectPeriod: 1000,
};

const topic = "water-tank";
const payload = "WebSocket mqtt test";
const qos = 0;

console.log("connecting mqtt client");
const client = mqtt.connect(connectUrl, options);

client.on("error", (err) => {
  console.log("Connection error: ", err);
  client.end();
});

client.on("reconnect", () => {
  console.log("Reconnecting...");
});

client.on("connect", () => {
  console.log("Client connected:" + clientId);

  client.subscribe(topic, { qos }, (error) => {
    if (error) {
      console.log("Subscribe error:", error);
      return;
    }
    console.log(`Subscribe to topic ${topic}`);
  });
});

client.on("message", (topic, payload) => {
  const message = payload.toString();
  const parts = message.split(";"); // Split by semicolon
  console.log("Received Message: " + message + "\nOn topic: " + topic);

  let tankA = 0,
    tankB = 0;

  parts.forEach((part) => {
    const [key, value] = part.split(":"); // Split by colon
    if (key === "A") tankA = parseInt(value);
    if (key === "B") tankB = parseInt(value);
  });

  // Pass the extracted values to drawChart
  drawChart(tankA, tankB);
});

function drawChart(tankA, tankB, tankC) {
  var data = google.visualization.arrayToDataTable([
    ["Label", "Value"],
    ["ලොකු ටැංකිය ", tankA],
    ["පොඩි ටැංකිය ", tankB],
  ]);

  var options = {
    width: 500,
    height: 500,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };

  var chart = new google.visualization.Gauge(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}
