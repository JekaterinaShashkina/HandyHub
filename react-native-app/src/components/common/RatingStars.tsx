import { StyleSheet, Text, View } from 'react-native';

type RatingStarsProps = {
  rating: number;
  max?: number;
};

export function RatingStars({ rating, max = 5 }: RatingStarsProps) {
  const roundedRating = Math.round(rating);

  return (
    <View style={styles.container}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < roundedRating;

        return (
          <Text
            key={index}
            style={[styles.star, !isFilled && styles.emptyStar]}
          >
            {isFilled ? '★' : '☆'}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 20,
    lineHeight: 22,
    color: '#FFC107',
    marginRight: 1,
  },
  emptyStar: {
    color: '#FFC107',
  },
});