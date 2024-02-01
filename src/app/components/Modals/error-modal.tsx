import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface ErrorModalProps {
    errorMessage: string;
    onClose: () => void;
    visible: boolean;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onClose, visible }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { width: "80%" }]}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TouchableOpacity style={[styles.closeButton, { marginTop: "auto", alignSelf: "flex-end" }]} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 10,
        paddingTop: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    errorMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    closeButton: {
        backgroundColor: "#222",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ErrorModal;
