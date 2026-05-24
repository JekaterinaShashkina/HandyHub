import { Image, StyleSheet, Text, View } from 'react-native';

export function AppFooter() {
  return (
    <View style={styles.footer}>
      <Image
        source={require('../../../assets/images/HandyHubTransparent.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.text}>Design by Catharine</Text>
        <Text style={styles.text}>Tg: @Mrshmallowww</Text>
      </View>

      <Text style={styles.copyright}>© HandyHub, 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 28,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 22,
    borderRadius: 0,

  },
  logo: {
    width: 150,
    height: 46,
    marginBottom: 24,
  },
  info: {
    gap: 14,
    marginBottom: 28,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#111111',
  },
  copyright: {
    fontSize: 15,
    color: '#111111',
  },
});