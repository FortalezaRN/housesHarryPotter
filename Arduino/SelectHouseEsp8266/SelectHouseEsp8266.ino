#include <Ultrasonic.h>
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""
#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define TRIGGER_PIN  16
#define ECHO_PIN     5

 int BLUE = 2;

 int GREEN = 0;

 int RED = 4;

Ultrasonic ultrasonic(TRIGGER_PIN, ECHO_PIN);

void setup()
{
  Serial.begin(115200);
  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(BLUE, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("conectando");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  
  Serial.println();
  Serial.print("conectado: ");
  Serial.println(WiFi.localIP());
  digitalWrite(LED_BUILTIN,LOW);
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void showColorHouse(String color){
  
    if (color == "Sonserina"){
      digitalWrite(RED,LOW);
      digitalWrite(GREEN,HIGH);
      digitalWrite(BLUE,LOW);
    }      
    else if (color == "Grifinoria"){
      digitalWrite(RED,HIGH);
      digitalWrite(GREEN,LOW);
      digitalWrite(BLUE,LOW);
    }
    else if (color == "Lufa-Lufa"){
      digitalWrite(RED,HIGH);
      digitalWrite(GREEN,HIGH);
      digitalWrite(BLUE,LOW);
    }      
    else if (color == "Corvinal"){      
      digitalWrite(RED,LOW);
      digitalWrite(GREEN,LOW);
      digitalWrite(BLUE,HIGH);
    }
}

void loop()
{ 
  digitalWrite(LED_BUILTIN,HIGH);
  String path = "/";
  FirebaseObject seila = Firebase.get(path);
  int distancia = ultrasonic.distanceRead();
  int distanciaDirebase = seila.getInt("arduinoDistancia");
  String currentHouse = seila.getString("stateCurrent/currentHouse/name");
  
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.failed());
      Serial.println(Firebase.error());
      delay(1000);
      return;
  }
  
  if(distancia < distanciaDirebase && distancia > 0){
    Firebase.setBool("arduino/choice", true);
    Serial.println("Arduino True");
  }
  showColorHouse(currentHouse);
  Serial.print(ultrasonic.distanceRead());// distância medida em cm
  Serial.println("cm"); // escreve texto na tela e pula uma linha
      
  delay(200);
}
