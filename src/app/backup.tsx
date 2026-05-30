// HomeScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

const dummyProducts = [
  {
    id: 1,
    name: 'Bayam Hijau Segar',
    price: 3500,
    unit: '1 ikat',
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800',
    rating: 4.9,
    category: 'Sayur',
  },
  {
    id: 2,
    name: 'Cabai Merah Keriting',
    price: 5000,
    unit: '250g',
    img: 'https://images.unsplash.com/photo-1596645025752-dfad408db05b?w=800',
    rating: 4.8,
    category: 'Bumbu',
  },
  {
    id: 3,
    name: 'Daging Ayam Paha',
    price: 15000,
    unit: '500g',
    img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    rating: 4.9,
    category: 'Daging',
  },
  {
    id: 4,
    name: 'Bawang Merah',
    price: 2000,
    unit: '250g',
    img: 'https://images.unsplash.com/photo-1615484478819-20dbb72f87a8?w=800',
    rating: 4.7,
    category: 'Bumbu',
  },
];

const categories = [
  { name: 'Sayur', Ionicons: '🥬' },
  { name: 'Buah', Ionicons: '🍎' },
  { name: 'Daging', Ionicons: '🥩' },
  { name: 'Bumbu', Ionicons: '🧄' },
  { name: 'Sembako', Ionicons: '🍚' },
];

// HomeScreen.tsx

export default function HomeScreen({ navigation }: any) {
  const search = useSharedValue('');
  const bannerOpacity = useSharedValue(0);
  const bannerScale = useSharedValue(0.95);

  // Animation on mount
  useEffect(() => {
    bannerOpacity.value = withTiming(1, { duration: 800 });
    bannerScale.value = withSpring(1, { damping: 12, stiffness: 90 });
  }, []);

  const bannerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: bannerOpacity.value,
    transform: [{ scale: bannerScale.value }],
  }));

  const addToCart = (product: any) => {
    // TODO: nanti pakai Redux/Zustand/Context
    console.log('Added:', product.name);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <View className="px-5 pt-3 pb-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xs text-gray-500 dark:text-gray-400">Pengantaran ke</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Ionicons name="location-sharp" size={18} color="#22c55e" />
              <Text className="font-semibold text-base">Setiabudi, Jakarta Selatan</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-5">
            <TouchableOpacity>
              <Ionicons name="moon-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity className="relative" onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart-outline" size={26} color="#666" />
              <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-[10px] font-bold">3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-24">
        {/* Search */}
        <View className="px-5 mt-4">
          <View className="bg-white dark:bg-gray-800 rounded-3xl px-5 py-3.5 flex-row items-center border border-gray-100 dark:border-gray-700">
            <Ionicons name="search-outline" size={22} color="#9ca3af" />
            <TextInput
              placeholder="Cari sayur segar, buah, atau daging..."
              className="flex-1 ml-3 text-base"
              placeholderTextColor="#9ca3af"
              onChangeText={(text) => (search.value = text)}
            />
          </View>
        </View>

        {/* Promo Banner dengan Reanimated */}
        <Animated.View style={bannerAnimatedStyle} className="mx-5 mt-6 rounded-3xl overflow-hidden shadow-2xl">
          <LinearGradient
            colors={['#22c55e', '#10b981']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6 relative"
          >
            <View className="w-3/4">
              <View className="bg-white/20 self-start px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold tracking-widest">PROMO SPESIAL</Text>
              </View>
              <Text className="text-white text-3xl font-bold mt-3 leading-tight">
                Diskon 25% Sayur Organik Hari Ini!
              </Text>
              <TouchableOpacity className="bg-white rounded-2xl py-3 px-6 self-start mt-5 active:opacity-90">
                <Text className="text-emerald-600 font-semibold">Belanja Sekarang</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d' }}
              className="absolute -bottom-6 right-4 w-40 h-40"
              style={{ transform: [{ rotate: '-15deg' }] }}
            />
          </LinearGradient>
        </Animated.View>

        {/* Categories */}
        <View className="mt-8 px-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800 dark:text-white">Kategori</Text>
            <Text className="text-emerald-600 font-medium">Lihat Semua</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat, i) => (
              <Animated.View key={i} entering={FadeIn.delay(i * 80)}>
                <TouchableOpacity className="items-center mr-5" activeOpacity={0.7}>
                  <View className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm items-center justify-center border border-gray-100 dark:border-gray-700">
                    <Text className="text-4xl">{cat.Ionicons}</Text>
                  </View>
                  <Text className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View className="mt-8 px-5">
          <Text className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Pilihan Segar Hari Ini</Text>

          <View className="flex-row flex-wrap justify-between">
            {dummyProducts.map((product, index) => (
              <TouchableOpacity
                key={product.id}
                className="w-[48%] mb-6 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm active:scale-[0.97]"
                onPress={() => navigation.navigate('ProductDetail', { product })}
              >
                <View className="relative">
                  <Image source={{ uri: product.img }} className="w-full h-44 object-cover" />
                  <View className="absolute top-3 right-3 bg-white/90 px-2 py-0.5 rounded-xl flex-row items-center">
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text className="text-xs font-bold ml-1">{product.rating}</Text>
                  </View>
                </View>

                <View className="p-4">
                  <Text className="font-semibold text-[15px] leading-tight" numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text className="text-emerald-600 font-bold text-lg mt-1">
                    Rp{product.price.toLocaleString('id-ID')}
                    <Text className="text-xs font-normal text-gray-500"> /{product.unit}</Text>
                  </Text>

                  <TouchableOpacity
                    className="mt-4 bg-emerald-50 dark:bg-emerald-900/30 py-3 rounded-2xl items-center"
                    onPress={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Text className="text-emerald-600 font-semibold">+ Keranjang</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}