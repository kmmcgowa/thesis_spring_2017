/*
 * Typical pin layout used:
 * -----------------------------------------------------------------------------------------
 *             MFRC522      Arduino       Arduino   Arduino    Arduino          Arduino
 *             Reader/PCD   Uno/101       Mega      Nano v3    Leonardo/Micro   Pro Micro
 * Signal      Pin          Pin           Pin       Pin        Pin              Pin
 * -----------------------------------------------------------------------------------------
 * RST/Reset   RST          9             5         D9         RESET/ICSP-5     RST
 * SPI SS 1    SDA(SS)      ** custom, take a unused pin, only HIGH/LOW required **
 * SPI SS 2    SDA(SS)      ** custom, take a unused pin, only HIGH/LOW required **
 * SPI MOSI    MOSI         11 / ICSP-4   51        D11        ICSP-4           16
 * SPI MISO    MISO         12 / ICSP-1   50        D12        ICSP-1           14
 * SPI SCK     SCK          13 / ICSP-3   52        D13        ICSP-3           15
 *
 */

#include <SPI.h>
#include <MFRC522.h>
// for testing memory usage
#include <MemoryFree.h>

#define RST_PIN         53
#define SS_1_PIN        22
#define SS_2_PIN        24
#define SS_3_PIN        26
#define SS_4_PIN        28
#define SS_5_PIN        30
#define SS_6_PIN        32
#define SS_7_PIN        34
#define SS_8_PIN        36
#define SS_9_PIN        38
#define SS_10_PIN       40
#define NR_OF_READERS   10

byte ssPins[] = {SS_1_PIN,SS_2_PIN,SS_3_PIN,SS_4_PIN,SS_5_PIN,SS_6_PIN,SS_7_PIN,SS_8_PIN,SS_9_PIN,SS_10_PIN};

MFRC522 mfrc522[NR_OF_READERS];

String old_ids[NR_OF_READERS];
String ids[NR_OF_READERS];

bool printJson;

void setup() {

  Serial.begin(9600);
  while (!Serial);

  SPI.begin();

  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    mfrc522[reader].PCD_Init(ssPins[reader], RST_PIN);
//    Serial.print(F("Reader "));
//    Serial.print(reader);
//    Serial.print(F(": "));
//    mfrc522[reader].PCD_DumpVersionToSerial();
    ids[reader] = "";
    old_ids[reader] = "";
  }
  // set to true to print the first time, a blank array
  printJson = true;
}


void loop() {

  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    // Look for new cards
    if (mfrc522[reader].PICC_IsNewCardPresent() && mfrc522[reader].PICC_ReadCardSerial()) {
      //send tag id convert to string
      stringify_byte_array(mfrc522[reader].uid.uidByte, mfrc522[reader].uid.size, reader);
      
      // Halt PICC
      mfrc522[reader].PICC_HaltA();
      // Stop encryption on PCD
      mfrc522[reader].PCD_StopCrypto1();
    }
  }
  // check if there are any new ids on the board if yes, print the json
  // this is to avoid crashing and massive console logging, aka ease the work of the node server reading
  for (uint8_t reader = 0; reader < NR_OF_READERS; reader++) {
    if(old_ids[reader] != ids[reader]){
      printJson = true;
    }
  }

  if(printJson){
    printIdArrayToJSON();
  }
  // always reset the print to false
  printJson = false;

}


void stringify_byte_array(byte *buffer, byte bufferSize, int reader) {

  String id ="";
  for (byte i = 0; i < bufferSize; i++) {
    if(buffer[i] < 0x10) {
      id += "0";
    }
    id += String(buffer[i], HEX);
  }
  ids[reader] = id;
}

void printIdArrayToJSON(){
  String str = "{\"values\":[";
  for(int reader = 0; reader < NR_OF_READERS; reader++){
    // value has been printed and is now 'old'
    old_ids[reader] = ids[reader];
    
    str += "\"";
    str += ids[reader];
    // to avoid the comma after the last array value
    if(reader == 9){
      str += "\"";
      break;
    }
    str += "\",";
  }
  str += "]}";
  Serial.println(str);

//  Serial.print("Free Memory : ");
//  Serial.println(freeMemory());
}







