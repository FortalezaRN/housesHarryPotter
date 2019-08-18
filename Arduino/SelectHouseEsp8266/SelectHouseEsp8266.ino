#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

 int RED = 5;

 int GREEN = 4;

 int BLUE = 0;

void setup()
{
  Serial.begin(115200);
  
  pinMode(A0, INPUT);
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
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void showColorHouse(String color){
  
    if (color == "/static/media/san.4f7890be.png"){
      digitalWrite(RED,LOW);
      digitalWrite(GREEN,HIGH);
      digitalWrite(BLUE,LOW);
    }      
    else if (color == "/static/media/grif.e5e07064.png"){
      digitalWrite(RED,HIGH);
      digitalWrite(GREEN,LOW);
      digitalWrite(BLUE,LOW);
    }
    else if (color == "/static/media/lufa.d27fb5de.png"){
      digitalWrite(RED,HIGH);
      digitalWrite(GREEN,HIGH);
      digitalWrite(BLUE,LOW);
    }      
    else if (color == "/static/media/rave.9ebbbfe0.png"){      
      digitalWrite(RED,LOW);
      digitalWrite(GREEN,LOW);
      digitalWrite(BLUE,HIGH);
    }
}

void loop()
{
  // faz a leitura do pino A0 (no nosso caso, o potenciômetro, retorna um valor entre 0 e 1023)
  String path = "/";
  FirebaseObject seila = Firebase.get(path);
  int potencia = analogRead(A0);
  String currentHouse = seila.getString("stateCurrent/currentHouse");
  
  // Serial.println(potencia);
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.failed());
      Serial.println(Firebase.error());
      delay(5000);
      return;
  }
  // como o LED no ESP8266 trabalha de maneira contrária, ou seja, quanto maior o valor atribuído, menor a intensidade. Faremos o cálculo para aumentarmos o brilho conforme girarmos o potenciômetro em sentido horário.
  Serial.println(potencia);
  if(potencia > 800){
    Firebase.setBool("arduino/choice", true);
    Serial.println("Arduino True");
  } else {
    Firebase.setBool("arduino/choice", false);
    Serial.println("Arduino False");
  }
  showColorHouse(currentHouse);
  delay(100);
}
