import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '../components/ui/text';

const Test = () => {
  return (
    <SafeAreaView className="m-5 grow">
      <Typography type="heading" className="text-error">
        Heading
      </Typography>
      <Typography type="heading" color="green">
        Heading Green
      </Typography>
      <Typography type="heading" color="green" className="text-purple-200">
        Heading Overridden
      </Typography>
      <Typography type="subtext">Subtext</Typography>
      <Typography type="subtext" color="primary">
        Subtext Primary
      </Typography>
      <Typography type="paragraph">Paragraph</Typography>
      <Typography type="paragraph" color="error">
        Paragraph Error
      </Typography>
      <Typography type="label">Label</Typography>
      <Typography type="label" color="main">
        Label Main
      </Typography>
      <Typography type="placeholder">Placeholder</Typography>
      <Typography type="placeholder" color="primary">
        Placeholder Primary
      </Typography>

      <Typography weight={100} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={200} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={300} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={400} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={500} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={600} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={700} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={800} className="text-[36px]">
        The quick brown fox
      </Typography>
      <Typography weight={900} className="text-[36px]">
        The quick brown fox
      </Typography>
    </SafeAreaView>
  );
};

export default Test;
