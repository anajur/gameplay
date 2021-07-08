import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, Share, Platform } from 'react-native';
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
import { Load } from '../../components/Load';
import { Member, MemberProps } from '../../components/Member';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import * as Linking from 'expo-linking';
import { api } from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;

}

export function AppointmentDetails() {
    const route = useRoute();
    const { guildSelected } = route.params as Params;
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    async function fetchWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert('Verifique as configurações do servidor. O widget está habilitado?')
        } finally {
            setLoading(false)

        }
    }
    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);

    }
    function handleShareInvitation() {
        const message = Platform.OS === 'ios'
            ? `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        });
    }
    function handleEdit() {
        navigation.navigate('EditGuild', { guildSelected, widget });

    }
    useEffect(() => {
        fetchWidget();
    }, []);

    return (
        <Background>
            <ScrollView>
                <Header
                    title="Detalhes"
                    action={guildSelected.guild.owner &&
                        <View style={styles.buttons}>
                            <BorderlessButton
                                onPress={handleShareInvitation}>
                                <Fontisto
                                    name="share"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                            </BorderlessButton>
                            <BorderlessButton style={styles.settings}>
                                <AntDesign
                                    onPress={handleEdit}
                                    name="setting"
                                    size={24}
                                    color={theme.colors.primary}
                                />
                            </BorderlessButton>
                        </View>
                    }
                />

                <ImageBackground
                    style={styles.banner}
                    source={BannerImg}
                >
                    <View style={styles.bannerContent}>
                        <Text style={styles.title}>
                            {guildSelected.guild.name}
                        </Text>
                        <Text style={styles.subtitle}>
                            {guildSelected.description}
                        </Text>
                    </View>
                </ImageBackground>
                {loading ? <Load /> :
                    <>
                        <ListHeader
                            title="Jogadores"
                            subtitle={`Total ${widget.members.length}`}
                        />
                        <FlatList
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Member data={item} />
                            )}
                            ItemSeparatorComponent={() => <ListDivider isCentered />}
                            style={styles.members}
                        >
                        </FlatList>
                    </>
                }
                {guildSelected.guild.owner &&
                    <View style={styles.footer}>
                        <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
                    </View>
                }
            </ScrollView>
        </Background>
    )
}