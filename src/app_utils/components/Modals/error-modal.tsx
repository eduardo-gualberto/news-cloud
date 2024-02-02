import React from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { Button } from '@rneui/themed'

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
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Button onPress={onClose} type="clear" size="lg" titleStyle={{ color: 'red' }}>Close</Button>
                    </View>
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
        marginBottom: 10,
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
