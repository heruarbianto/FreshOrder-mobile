import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: "Pesan dari Rumah",
    desc: "Cukup buka HP, sayur segar sampai di depan pintu dalam waktu singkat",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c?w=800", // Delivery to home
    bg: ['#22c55e', '#10b981'],
  },
  {
    id: 2,
    title: "Ongkir Super Murah",
    desc: "Mulai dari Rp5.000 saja 3km pertama • Tambahan Rp1.500/km selanjutnya",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c83137?w=800", // Delivery truck
    bg: ['#14b8a6', '#0f766e'],
  },
  {
    id: 3,
    title: "Gratis Biaya Admin",
    desc: "Tidak ada biaya admin sama sekali. Transparan & hemat",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", // Money / wallet
    bg: ['#8b5cf6', '#6d28d9'],
  },
  {
    id: 4,
    title: "Harga Pasar Langsung",
    desc: "Harga flat dari petani & pasar induk. Update real-time setiap hari",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800", // Fresh market
    bg: ['#f59e0b', '#d97706'],
  },
  {
    id: 5,
    title: "Segar Langsung Petani",
    desc: "Dipetik pagi ini, diantarkan sore ini. Kualitas premium terjamin",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800", // Fresh vegetables
    bg: ['#22c55e', '#15803d'],
  },
];

export default function CarouselSlider() {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      if (!isAutoScrolling) return;
      
      const nextIndex = (currentIndex + 1) % slides.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 40),
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 5000); // 5 detik
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAutoScrolling]);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = () => {
    setIsAutoScrolling(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);
  };

  return (
    <View className="px-5">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="rounded-3xl overflow-hidden shadow-2xl"
        style={{ width: width - 40 }}
      >
        {slides.map((slide) => (
          <LinearGradient
            key={slide.id}
            colors={slide.bg as unknown as readonly [import('react-native').ColorValue, import('react-native').ColorValue, ...import('react-native').ColorValue[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="relative overflow-hidden"
            style={{ width: width - 40, height: 190 }}
          >
            {/* Background Image */}
            <Image
              source={{ uri: slide.image }}
              className="absolute inset-0 w-full h-full opacity-20"
              resizeMode="cover"
            />

            <View className="p-6 relative z-10 flex-1 justify-center">
              <View className="bg-white/20 self-start px-4 py-1 rounded-full mb-4">
                <Text className="text-white text-xs font-bold tracking-widest">
                  KELEBIHAN BELANJASAYUR
                </Text>
              </View>

              <Text className="text-white text-2xl font-bold leading-tight mb-3">
                {slide.title}
              </Text>

              <Text className="text-white/90 text-[15px] leading-relaxed pr-8">
                {slide.desc}
              </Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View className="flex-row justify-center mt-4 gap-2">
  {slides.map((_, index) => {
    const animatedStyle = useAnimatedStyle(() => ({
      width: withTiming(index === currentIndex ? 32 : 10, { duration: 300 }),
    }));

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          scrollRef.current?.scrollTo({
            x: index * (width - 40),
            animated: true,
          });
          setCurrentIndex(index);
        }}
      >
        <Animated.View
          style={[
            {
              height: 10,
              borderRadius: 999,
              backgroundColor: 'white',
              opacity: index === currentIndex ? 1 : 0.5,
            },
            animatedStyle,
          ]}
        />
      </TouchableOpacity>
    );
  })}
</View>
    </View>
  );
};