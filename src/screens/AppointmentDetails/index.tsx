import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header/';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png'
import { ImageBackground } from 'react-native';
import { Member } from '../../components/Member';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ScrollView } from 'react-native-gesture-handler';

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'AnaJu',
            avatar_url: 'https://github.com/anajur.png',
            status: 'online'
        },
        {
            id: '2',
            username: 'Eric',
            avatar_url: 'https://github.com/EricDorneles.png',
            status: 'online'
        },
        {
            id: '3',
            username: 'Brunno',
            avatar_url: 'https://github.com/BrunnoFdc.png',
            status: 'offline'
        }

    ]
    return (
        <Background>
            <ScrollView>
                <Header
                    title="Detalhes"
                    action={
                        <BorderlessButton>
                            <Fontisto
                                name="share"
                                size={24}
                                color={theme.colors.primary}
                            />
                        </BorderlessButton>
                    }
                />
                <ImageBackground
                    style={styles.banner}
                    source={BannerImg}
                >
                    <View style={styles.bannerContent}>
                        <Text style={styles.title}>
                            Lendários
                        </Text>
                        <Text style={styles.subtitle}>
                            É hoje que vamos chegar ao challenger sem perder uma partida da md10
                        </Text>
                    </View>
                </ImageBackground>
                <ListHeader
                    title="Jogadores"
                    subtitle="Total 3"
                />
                <FlatList
                    data={members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Member data={item} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.members}
                >
                </FlatList>
                <View style={styles.footer}>
                    <ButtonIcon title="Entrar na partida" />
                </View>
            </ScrollView>
        </Background>
    )
}