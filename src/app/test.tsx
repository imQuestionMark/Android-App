import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const closeModal1 = () => {
    console.log('first modal closed');
    setModal1Visible(false);
  };

  const closeModal2 = () => {
    console.log('first modal closed');
    setModal2Visible(false);
  };

  const closeModal3 = () => {
    console.log('first modal closed');
    setModal3Visible(false);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-orange-950 p-8">
      <TouchableOpacity
        onPress={() => setModal1Visible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Modal 1</Text>
      </TouchableOpacity>
      <Link href="/personal-details">
        <Text className="text-3xl text-white">Go to</Text>
      </Link>

      {/* Modal 1 */}
      <Modal
        visible={modal1Visible}
        transparent
        animationType="fade"
        onRequestClose={closeModal1}
      >
        <TouchableWithoutFeedback onPress={closeModal1}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent]}>
                <Text>Modal 1</Text>
                <TouchableOpacity
                  onPress={() => setModal2Visible(true)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Open Modal 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModal1Visible(false)}
                  style={styles.closeButton}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal 2 */}
      <Modal visible={modal2Visible} transparent style={styles.modal}>
        <TouchableWithoutFeedback onPress={closeModal2}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent]}>
                <Text>Modal 2</Text>
                <TouchableOpacity
                  onPress={() => setModal3Visible(true)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Open Modal 3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModal2Visible(false)}
                  style={styles.closeButton}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal 3 */}
      <Modal visible={modal3Visible} transparent style={styles.modal}>
        <TouchableWithoutFeedback onPress={closeModal3}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent]}>
                <Text>Modal 3</Text>

                <TouchableOpacity
                  onPress={() => setModal3Visible(false)}
                  style={styles.closeButton}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },

  modal: { justifyContent: 'flex-start', margin: 0 },
  modalWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  modalContent: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.1,
  },

  absoluteCenter: {
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.1,
  },
});

export default App;
