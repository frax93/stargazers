import { View, StyleSheet, Text, FlatList, Image } from 'react-native';

export default function UserList({ data }) {
  return (
    <View>
      {data ? data?.length > 0 ? <FlatList
        testID="user-list"
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image testID="image-item" source={{ uri: item?.avatar_url || '' }} style={styles.imageViewContainer} />
            <View style={styles.textViewContainer}>
              <Text style={styles.itemTitle} testID="avatar-item">
                {item?.login || ''}
              </Text>
            </View>
          </View>
        )}
      /> : <Text testID="no-element">No element found</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    direction: 'rtl',
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  imageViewContainer: {
    width: 44,
    height: 44,
    margin: 10,
    borderRadius: 22,
  },
  textViewContainer: {
    width: 'auto',
    paddingTop: 10,
  },
  itemTitle: {
    width: '100%',
    textAlign: 'right',
  },
});
