import CarouselSlider from '@/komponen/CarouselSlider';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo } from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyProducts = [
  { id: 1, name: 'Bayam Hijau Segar', price: 3500, unit: '1 ikat', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800', rating: 4.9 },
  { id: 2, name: 'Cabai Merah Keriting', price: 5000, unit: '250g', img: 'https://images.unsplash.com/photo-1596645025752-dfad408db05b?w=800', rating: 4.8 },
  { id: 3, name: 'Daging Ayam Paha', price: 15000, unit: '500g', img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', rating: 4.9 },
  { id: 4, name: 'Bawang Merah', price: 2000, unit: '250g', img: 'https://images.unsplash.com/photo-1615484478819-20dbb72f87a8?w=800', rating: 4.7 },
  { id: 5, name: 'Kangkung Segar', price: 3000, unit: '1 ikat', img: 'https://images.unsplash.com/photo-1585501928334-0b7c5f8b8f8b?w=800', rating: 4.8 },
  { id: 6, name: 'Tomat Merah Segar', price: 8000, unit: '500g', img: 'https://images.unsplash.com/photo-1592924357228-91a4daa88427?w=800', rating: 4.9 },
];

const categories = [
  { name: 'Sayur', Ionicons: '🥬' },
  { name: 'Buah', Ionicons: '🍎' },
  { name: 'Daging', Ionicons: '🥩' },
  { name: 'Bumbu', Ionicons: '🧄' },
  { name: 'Sembako', Ionicons: '🍚' },
];

export default function HomeScreen({ navigation }: any) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;   // Tablet / Large Phone
  const isMediumScreen = width >= 480;

  const numColumns = isLargeScreen ? 3 : 2;

  const bannerOpacity = useSharedValue(0);
  const bannerScale = useSharedValue(0.92);

  useEffect(() => {
    bannerOpacity.value = withTiming(1, { duration: 900 });
    bannerScale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, []);

  const bannerStyle = useAnimatedStyle(() => ({
    opacity: bannerOpacity.value,
    transform: [{ scale: bannerScale.value }],
  }));

  const productWidth = useMemo(() => {
    const gap = 16;
    return (width - 40 - (numColumns - 1) * gap) / numColumns;
  }, [width, numColumns]);

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
            {/* <TouchableOpacity>
              <Ionicons name="moon-outline" size={24} color="#666" />
            </TouchableOpacity> */}
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
        
        {/* Search Bar */}
        <View className="px-5 mt-4 mb-1.5">
          <View className="bg-white dark:bg-gray-800 rounded-3xl px-5 py-3.5 flex-row items-center border border-gray-100 dark:border-gray-700">
            <Ionicons name="search-outline" size={22} color="#9ca3af" />
            <TextInput
              placeholder="Cari sayur segar, buah, atau daging..."
              className="flex-1 ml-3 text-base"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
        
        {/* Promo Banner */}
        <CarouselSlider />
        {/* <Animated.View style={bannerStyle} className="mx-5 mt-6 rounded-3xl overflow-hidden shadow-2xl">
          <LinearGradient
            colors={['#22c55e', '#10b981']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6 relative"
          >
            <View className={`${isLargeScreen ? 'w-2/3' : 'w-4/5'}`}>
              <View className="bg-white/20 self-start px-4 py-1 rounded-full">
                <Text className="text-white text-xs font-bold tracking-widest">PROMO SPESIAL</Text>
              </View>
              <Text className="text-white text-[28px] md:text-3xl font-bold mt-3 leading-tight">
                Diskon 25% Sayur Organik Hari Ini!
              </Text>
              <TouchableOpacity className="bg-white rounded-2xl py-3.5 px-7 self-start mt-5">
                <Text className="text-emerald-600 font-semibold">Belanja Sekarang</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View> */}

        {/* Categories */}
        <View className="mt-8 px-1.5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800 dark:text-white">Kategori</Text>
            <Text className="text-emerald-600 font-medium">Lihat Semua</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat, i) => (
              <Animated.View key={i} entering={FadeIn.delay(i * 60)} className="mr-6">
                <TouchableOpacity className="items-center" activeOpacity={0.75}>
                  <View className="w-16 h-16 mx-1.5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm items-center justify-center border border-gray-100 dark:border-gray-700">
                    <Text className="text-4xl">{cat.Ionicons}</Text>
                  </View>
                  <Text className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid - Responsive */}
        <View className="mt-8 px-5">
          <Text className="text-xl font-bold mb-5 text-gray-800 dark:text-white">
            Pilihan Segar Hari Ini
          </Text>

          <View 
            className="flex-row flex-wrap justify-between"
            style={{ gap: 16 }}
          >
            {dummyProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={{ width: productWidth }}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm active:scale-[0.97] mb-4"
                onPress={() => navigation.navigate('ProductDetail', { product })}
              >
                <View className="relative">
                  <Image 
                    source={{ uri: product.img }} 
                    className="w-full h-44 object-cover" 
                  />
                  <View className="absolute top-3 right-3 bg-white/95 px-2 py-0.5 rounded-xl flex-row items-center shadow-sm">
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text className="text-xs font-bold ml-1">{product.rating}</Text>
                  </View>
                </View>

                <View className="p-4">
                  <Text className="font-semibold text-[15px] leading-tight" numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text className="text-emerald-600 font-bold text-lg mt-2">
                    Rp{product.price.toLocaleString('id-ID')}
                    <Text className="text-xs font-normal text-gray-500"> /{product.unit}</Text>
                  </Text>

                  <TouchableOpacity
                    className="mt-4 bg-emerald-50 dark:bg-emerald-900/30 py-3 rounded-2xl items-center"
                    onPress={(e) => {
                      e.stopPropagation();
                      console.log('Added to cart:', product.name);
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