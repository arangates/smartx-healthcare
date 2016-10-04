
#include <SPI.h>
#include <WiFi.h>
#include <WiFiClient.h>

WiFiClient client;

char ssid[] = "Lonelyspot";
char password[] = "smartdevice";
int keyIndex = 0;
char * server_name = "52.39.9.186";
String inString = "";
void setup() {

  Serial.begin(115200);
  Serial1.begin(9600);
  Serial.print("Attempting to connect to Network named: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }

  Serial.println("\nYou're connected to the network");
  Serial.println("Waiting for an ip address");

  while (WiFi.localIP() == INADDR_NONE) {
    Serial.print(".");
    delay(300);
  }

}

void loop() {

  while (Serial1.available() > 0) {
    int inChar = Serial1.read();
    if (isDigit(inChar)) {
      inString += (char) inChar;
    }
    if (inChar == '\n') {

      int systolic_pressure = inString.substring(0, 3).toInt();
      int diastolic_pressure = inString.substring(3, 6).toInt();
      int pulse = inString.substring(6, 9).toInt();
      int temp = random(27,28);
      int id = 10001;
      inString = "";

      if (client.connect(server_name, 3000)) {
        Serial.println("Connected");

        Serial.print(F("Sending request... "));

        client.print(F("GET /api/feed/create"));
        client.print(F("/"));
        client.print(id);
        client.print(F("/"));
        client.print(systolic_pressure);
        client.print(F("/"));
        client.print(diastolic_pressure);
        client.print(F("/"));
        client.print(pulse);
        client.print(F("/"));
        client.print(temp);
        client.println(F(" HTTP/1.1"));

        client.println(F("Host: http://52.39.9.186/"));
        client.println(F("Connection: close"));
        client.println(F(""));

        Serial.println(F("done."));
      }

      Serial.println(F("Reading answer..."));
      while (client.connected()) {
        while (client.available()) {
          char c = client.read();
          Serial.print(c);
        }
      }
      Serial.println(F(""));
      client.stop();
      Serial.println(F("Closing connection"));
      Serial.println(F(""));

    }
  }

}
