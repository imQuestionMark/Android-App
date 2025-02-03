import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModal1Visible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Modal 1</Text>
      </TouchableOpacity>

      {/* Modal 1 */}
      <Modal
        isVisible={modal1Visible}
        backdropOpacity={0.5}
        propagateSwipe={true} // Allows child modals to interact
        style={styles.modal}
      >
        <View style={styles.modalWrapper}>
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            style={[styles.modalContent, styles.absoluteCenter]}
          >
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
          </MotiView>
        </View>
      </Modal>

      {/* Modal 2 */}
      <Modal
        isVisible={modal2Visible}
        backdropOpacity={0} // Prevents blocking interactions
        propagateSwipe={true}
        style={styles.modal}
      >
        <View style={styles.modalWrapper}>
          <MotiView
            from={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            style={[styles.modalContent, styles.absoluteCenter]}
          >
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
          </MotiView>
        </View>
      </Modal>

      {/* Modal 3 */}
      <Modal
        isVisible={modal3Visible}
        backdropOpacity={0}
        propagateSwipe={true}
        style={styles.modal}
      >
        <View style={styles.modalWrapper}>
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            style={[styles.modalContent, styles.absoluteCenter]}
          >
            <Text>Modal 3</Text>
            <TouchableOpacity
              onPress={() => setModal3Visible(false)}
              style={styles.closeButton}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  },

  absoluteCenter: {
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.1,
  },
});

export default App;
