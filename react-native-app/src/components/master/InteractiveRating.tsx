import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HandyHubColors } from '@/constants/theme';

type InteractiveRatingProps = {
  rating: number;
  onChange: (rating: number) => void;
};

export function InteractiveRating({ rating, onChange }: InteractiveRatingProps) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Pressable key={value} onPress={() => onChange(value)}>
          <Text style={styles.star}>
            {value <= rating ? '\u2605' : '\u2606'}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 22,
    lineHeight: 24,
    color: HandyHubColors.star,
    marginLeft: 2,
  },
});
