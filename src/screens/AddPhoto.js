import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Button,
    Modal,
    Dimensions,
    Platform,
    ScrollView,
    Alert
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/actions/posts";
import { resetPostStatus } from "../store/reducers/posts";

const AddPhoto = ({navigation}) => {
    // estado global redux
    const name = useSelector((state) => state.user.name);
    const email = useSelector((state) => state.user.email);
    const isUploading = useSelector((state) => state.posts.isUploading);
    const postSuccess = useSelector((state) => state.posts.postSuccess);

    // estado local
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const noUser = "Você precisa está logado para adicionar imagens";

    const dispatch = useDispatch();

    useEffect(() => {
        if (postSuccess) {
            setImage(null);
            setComment('');
            navigation.navigate('feed'); // Redireciona após o post ser bem-sucedido
        }
    }, [postSuccess, dispatch, navigation]);

    const openCamera = () => {
        if(!name) {
            Alert.alert("Falha! ",noUser);
            return;
        }

        launchCamera(
          {
            mediaType: 'photo',
            maxWidth: 800,
            maxHeight: 600,
            includeBase64: true,
          },
          (response) => {
            if (response.didCancel) {
              console.log('User cancelled camera');
            } else if (response.errorMessage) {
              console.log('Camera Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
              const selectedImage = response.assets[0];
              setImage({ uri: selectedImage.uri, base64: selectedImage.base64 });
            }
            setModalVisible(false); // Fecha o modal após a seleção
          }
        );
      };

      const openGallery = () => {
        if(!name) {
            Alert.alert("Falha! ",noUser);
            return;
        }
        launchImageLibrary(
          {
            mediaType: 'photo',
            maxWidth: 800,
            maxHeight: 600,
            includeBase64: true,
          },
          (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.errorMessage) {
              console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
              const selectedImage = response.assets[0];
              setImage({ uri: selectedImage.uri, base64: selectedImage.base64 });
            }
            setModalVisible(false); // Fecha o modal após a seleção
          }
        );
      };

    save = async () => {
        if(!name) {
            Alert.alert("Falha! ",noUser);
            return;
        }

        dispatch(addPost({
            id: Math.random(),
            nickname: name,
            email: email,
            image: image,
            comments: [{
                nickname: name,
                comment: comment
            }]
        }))
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Compartilhe sua imagem</Text>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Escolha a imagem</Text>
                </TouchableOpacity>
                {image && 
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image.uri }} style={styles.image} />
                    </View>
                }

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Escolha uma opção</Text>
                            <View style={styles.optionPicture}>
                                <TouchableOpacity style={styles.buttonChoose} onPress={openCamera}>
                                    <Text style={styles.buttonText}>Tirar Foto</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonChoose} onPress={openGallery}>
                                    <Text style={styles.buttonText}>Escolher da Galeria</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TextInput style={styles.input} editable={name !== null} placeholder="Adicionar legenda..." onChangeText={setComment}/>
                <TouchableOpacity disabled={isUploading} style={[styles.button, isUploading ? styles.buttonDisabled : null]} onPress={() => save()}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#eee',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        gap: 2,
        padding: 10,
        opacity: 1,
        backgroundColor: '#fff',
        borderRadius: 10,   
        marginRight: 30,
        marginLeft: 30
    },
    modalText: {
        color: "#000",
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    optionPicture: {
        gap: 3,
        flexDirection: 'row'
    },
    buttonChoose: {
        backgroundColor: '#4286f4',
        width: '49%',
        marginBottom: 0
    },
    buttonClose: {
        marginTop: 0,
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 10,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color: '#fff'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: "#aaa"
    }
});

export default AddPhoto;