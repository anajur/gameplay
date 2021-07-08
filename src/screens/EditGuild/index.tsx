import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles';
import { Button } from '../../components/Button';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header/';
import BannerImg from '../../assets/banner.png'
import { ImageBackground } from 'react-native';
import { MemberProps } from '../../components/Member';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { useNavigation } from '@react-navigation/native';
import { TextArea } from '../../components/TextArea';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

type Params = {
    guildSelected: AppointmentProps;
    widget: GuildWidget;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function EditGuild() {
    const route = useRoute();
    const { guildSelected, widget } = route.params as Params;
    const [description, setDescription] = useState(guildSelected.description);

    const navigation = useNavigation();

    async function handleSave() {

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const array = storage ? JSON.parse(storage) : [];
        const newAppointments = array.map(
            (i: AppointmentProps) =>
                i.id === guildSelected.id ? { ...i, description: description } : i);

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS, JSON.stringify(newAppointments)
        );

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView
            behavior="position" enabled
            style={styles.container}
        >
            <Background>
                <ScrollView>
                    <Header
                        title="Editar Servidor"
                    />
                    <ImageBackground
                        style={styles.banner}
                        source={BannerImg}
                    >
                        <View style={styles.bannerContent}>
                            <Text style={styles.title}>
                                {widget.name}
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.form}>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>
                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>
                        <TextArea
                            multiline
                            value={description}
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                        <View style={styles.footer}>
                            <Button title="Editar" onPress={handleSave} />
                        </View>
                    </View>
                </ScrollView>
            </Background>
        </KeyboardAvoidingView>
    )
}