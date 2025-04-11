import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import { Button, ButtonText, Typography } from '@/components/ui';
import { openLinkInBrowser } from '@/lib/utils';

const details = {
  logo: require('assets/figma.png'),
  company: 'Figma',
  location: 'New York, United States',
};

const CompanyDetails = () => {
  return (
    <SafeAreaView className="flex-1" edges={[]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-14">
          <DetailsCard details={details} />
          <Location />
          <CompanyDescription />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDetails;

const DetailsCard = ({ details }) => {
  const openMaps = async () => {
    const android = `geo:0,0?q=13.0358471, 80.2321063(Treasure)`;
    const ios = `maps:0,0?q=13.0358471, 80.2321063(Treasure)`;
    const url = Platform.select({ ios, android });
    if (url) await Linking.openURL(url);
  };

  const visitWebsite = () => {
    const url = `https://figma.com`;
    openLinkInBrowser(url);
  };

  return (
    <LinearGradient
      colors={['#DFE8FF', '#FFFFFF']}
      style={{
        borderRadius: 12,
      }}
    >
      <View className=" rounded-2xl border border-primary p-6">
        <View className="flex-row items-center gap-6">
          <Image
            source={details.logo}
            contentFit="contain"
            className="size-[55px] overflow-hidden rounded-[12px] border border-black"
          />

          <Typography className="text-[32px] text-main" weight={500}>
            {details.company}
          </Typography>
        </View>

        <View className="my-4">
          <View className="flex-row items-center gap-4">
            <Ionicons name="location-outline" size={20} color="#596574" />
            <Typography className="text-[16px] text-[#596574]">
              {details.location}
            </Typography>
          </View>
        </View>

        <View className="mt-2 flex-row flex-wrap gap-4">
          <Button className="grow" variant="outline" onPress={openMaps}>
            <ButtonText className="text-[13px]">Linkedin Profile</ButtonText>
          </Button>

          <Button variant="solid" className="grow" onPress={visitWebsite}>
            <ButtonText className="text-[13px]">Visit Website</ButtonText>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

const mapContent = (coords) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Simple Leaflet Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      touch-action: none;
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }

    #map {
      height: 100%;
      width: 100%;
    }

    html, body {
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
  document.addEventListener('DOMContentLoaded', function () {
    const coordinates = [${coords.latitude}, ${coords.longitude}];
    const map = L.map('map', {
      center: coordinates,
      zoom: 16,
      zoomControl: false,    
      dragging: false, 
      touchZoom: false,     
      scrollWheelZoom: false, 
      doubleClickZoom: false, 
      boxZoom: false,
      keyboard: false,
      tap: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    const marker = L.marker(coordinates).addTo(map);
    marker.bindPopup("Figma Inc.")
  });
  </script>
</body>
</html>
`;

const Location = () => {
  const [coordinates] = useState({
    latitude: 13.0358471,
    longitude: 80.2321063,
  });

  const openMaps = async () => {
    const { latitude, longitude } = coordinates;
    const label = 'Treasure';

    const scheme = Platform.select({
      ios: 'maps:',
      android: 'geo:',
    });

    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}0,0?q=${latLng}(${label})`,
      android: `${scheme}0,0?q=${latLng}(${label})`,
    });

    try {
      if (!url) return console.log('No URL provided');
      // const canOpen = await Linking.canOpenURL(url);
      const canOpen = true;

      console.log('🚀🚀🚀 ~ openMaps ~ canOpen:', canOpen);
      console.log('🚀🚀🚀 ~ openMaps ~ url:', url);

      if (canOpen && url) {
        await Linking.openURL(url);
      } else {
        console.log("Can't open maps app");
      }
    } catch (error) {
      console.error('Error opening maps:', error);
    }
  };

  return (
    <View className="mt-4 flex-row gap-6 rounded-[12px] border border-[#EFEFF1] p-[16px]">
      <View className="grow gap-2">
        <Typography weight={500} className="text-[20px] text-main">
          Located At
        </Typography>
        <Typography className="text-[14px]">
          21, Sabari Street, Nesapakkam,. K.K. Nagar West, Chennai - 600 078
        </Typography>

        <Pressable onPress={openMaps}>
          <View className="h-[180px] w-full overflow-hidden rounded-[15px] bg-red-200">
            <WebView
              source={{ html: mapContent(coordinates) }}
              scrollEnabled={false}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const CompanyDescription = () => {
  return (
    <View className="mt-4 flex-row gap-6 rounded-[12px] border border-[#EFEFF1] p-[16px]">
      <View className="gap-2">
        <Typography weight={500} className="text-[20px] text-main">
          Company Profile
        </Typography>
        <Typography className="text-[14px]">
          For the uninitiated, a company profile is a comprehensive document
          that provides detailed information about a business entity. It serves
          as a snapshot or overview of the company's history, mission, values,
          products, and other relevant information. Therefore, Microsoft's
          profile acted more than a marketing tool. It reflected its identity, a
          compass for navigating the industry, and a bridge between the brand
          and its audience.
        </Typography>
      </View>
    </View>
  );
};
