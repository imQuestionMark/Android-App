import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import GradientView from '@/components/onboarding/gradient-view';

const Professional = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  const roles = [{ label: 'UX UI Designer', value: 'UX UI Designer' }];

  const designations = [
    { label: 'UXUI designer', value: 'UXUI designer' },
    { label: 'UX writer', value: 'UX writer' },
    { label: 'UI designer', value: 'UI designer' },
    { label: 'UX researcher', value: 'UX researcher' },
  ];

  return (
    <GradientView>
      <Text style={styles.title}>Job preference</Text>

      <Text style={styles.sectionTitle}>Select Your Role</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={roles}
        labelField="label"
        valueField="value"
        placeholder="Select role"
        value={selectedRole}
        onChange={(item) => setSelectedRole(item.value)}
      />

      <Text style={styles.sectionTitle}>Choose designation</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={designations}
        labelField="label"
        valueField="value"
        placeholder="Select designation"
        value={selectedDesignation}
        onChange={(item) => setSelectedDesignation(item.value)}
      />
    </GradientView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default Professional;
