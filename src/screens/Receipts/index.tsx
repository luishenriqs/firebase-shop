import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import storage from '@react-native-firebase/storage';
import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState('');
  const [photoInfo, setPhotoInfo] = useState('');

  async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();

    setPhotoSelected(urlImage);

    const info = await storage().ref(path).getMetadata();
    setPhotoInfo(`Name: ${info.name}`)
  }

  function handleDeleteImage(path: string) {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        Alert.alert('Image deleted successfully!')
        fetchImage();
      })
      .catch(error => console.error(error))
  }

  async function fetchImage() {
    storage().ref('Images').list().then(result => {
      const files: FileProps[] = [];

      result["_items"].forEach(file => {
        files.push({
          name: file.name,
          path: file.path
        })
      });

      setPhotos(files);
    });
  };

  useEffect(() => {
    fetchImage();
  }, []);
  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>
        {photoInfo}
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
