import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Visa from "../svg/Visa";
import TrashIcon from "../svg/TrashIcon";


  const CardItem = ({ card, onDelete }) => {

  const [showModal, setShowModal] = useState(false);
 
  return (
<>
<View style={styles.card}>

        {/* Icon */}
<View style={styles.iconContainer}>
<Visa width={30} height={30} />
</View>
 
        {/* Info */}
<View style={styles.infoContainer}>
<Text style={styles.title}>{card.cardholder_name}</Text>
<Text style={styles.subtitle}>{card.card_number}</Text>
<Text style={styles.subtitle}>

            Exp: {card.expiration_date} | CVV: ***
</Text>
</View>
 
        {/* Delete */}
<TouchableOpacity

          onPress={() => setShowModal(true)}

          style={styles.deleteButton}
>
<TrashIcon width={24} height={24} />
</TouchableOpacity>
</View>
 
      {/* Confirm Modal */}
<Modal

        transparent

        animationType="fade"

        visible={showModal}

        onRequestClose={() => setShowModal(false)}
>
<View style={styles.modalOverlay}>
<View style={styles.modalContent}>
<Text style={styles.modalTitle}>Delete this card?</Text>
<Text style={styles.modalText}>

              Are you sure you want to remove this card?
</Text>
 
            <View style={styles.modalButtons}>
<TouchableOpacity

                onPress={() => setShowModal(false)}

                style={styles.cancelButton}
>
<Text style={{ color: "#000", fontWeight: "600" }}>No</Text>
</TouchableOpacity>
 
              <TouchableOpacity

                onPress={() => {

                  onDelete();

                  setShowModal(false);

                }}

                style={styles.confirmButton}
>
<Text style={{ color: "#fff", fontWeight: "600" }}>Yes</Text>
</TouchableOpacity>
</View>
</View>
</View>
</Modal>
</>

  );

};

 

export default CardItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E2F36",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#5C5C5E",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    padding: 25,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: "#E5E5EA",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: "#0195F5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
