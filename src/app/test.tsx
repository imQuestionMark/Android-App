import { SafeAreaView } from 'react-native-safe-area-context';

import Text from '@/components/ui/text';

const Test = () => {
  return (
    <SafeAreaView className="m-5 grow">
      <Text type="heading" className="text-error">
        Heading
      </Text>
      <Text type="heading" color="green">
        Heading Green
      </Text>
      <Text type="heading" color="green" className="text-purple-200">
        Heading Overridden
      </Text>
      <Text type="subtext">Subtext</Text>
      <Text type="subtext" color="primary">
        Subtext Primary
      </Text>
      <Text type="paragraph">Paragraph</Text>
      <Text type="paragraph" color="error">
        Paragraph Error
      </Text>
      <Text type="label">Label</Text>
      <Text type="label" color="main">
        Label Main
      </Text>
      <Text type="placeholder">Placeholder</Text>
      <Text type="placeholder" color="primary">
        Placeholder Primary
      </Text>
    </SafeAreaView>
  );
};

export default Test;
