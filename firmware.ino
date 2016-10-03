#include < SPI.h > 
#include < WiFi.h > 
#include < WiFiClient.h >

  WiFiClient client;

char ssid[] = "Connectify-smartx";
char password[] = "SaT123!@#";
int keyIndex = 0;
String inString = "";
char * server_name = "http://52.39.9.186/";

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

      Serial.print("Value:");
      Serial.println(inString.toInt());
      Serial.print("String: ");
      Serial.println(inString);

      int systolic_pressure = inString.substring(0, 3).toInt();
      int diastolic_pressure = inString.substring(3, 6).toInt();
      int pulse = inString.substring(6, 9).toInt();

      inString = "";

      if (client.connect(server_name, 3000)) {
        Serial.println("Connected");

        Serial.print(F("Sending request... "));

        client.print(F("GET /api/"));
        client.print(F("?systolic_pressure="));
        client.print(systolic_pressure);
        client.print(F("&diastolic_pressure="));
        client.print(diastolic_pressure);
        client.print(F("&pulse="));
        client.print(pulse);
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
