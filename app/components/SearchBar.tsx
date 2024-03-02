import React from 'react'
import { StyleSheet, TextInput, TextStyle, View, ViewStyle, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

type SearchBarProps = {
    name: string;
    year: string;
    onChangeName: (text: string) => void;
    onChangeYear: (text: string) => void;
    onSubmit: () => void;
}

const SearchBar = ({ name, year, onChangeName, onChangeYear, onSubmit }: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <Icon.Button name="search" size={30} color="black" backgroundColor='#e0e0e0' borderRadius={10} onPress={onSubmit} />
            <TextInput
                placeholder="Buscar por nombre"
                placeholderTextColor="gray"
                onChangeText={onChangeName}
                value={name}
                style={styles.inputName}
                onSubmitEditing={onSubmit}
            />
            <TextInput
                placeholder="Año"
                placeholderTextColor="gray"
                onChangeText={onChangeYear}
                value={year}
                style={styles.inputYear}
                onSubmitEditing={onSubmit}
            />
        </View>
    );
};

export default SearchBar;

interface Styles {
    container: ViewStyle;
    inputName: ViewStyle & TextStyle;
    inputYear: ViewStyle & TextStyle;
    icon: ViewStyle;
    [key: string]: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    inputName: {
        flex: 0.7,
        borderRadius: 10,
        marginLeft: 10,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        padding: 10
    },
    inputYear: {
        flex: 0.3,
        borderRadius: 10,
        marginLeft: 10,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        padding: 10
    },
    icon: {
        alignSelf: 'center'
    },
});
