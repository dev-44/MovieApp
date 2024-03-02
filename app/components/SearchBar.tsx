import React from 'react'
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
            <TouchableOpacity onPress={onSubmit}>
                <Icon name="search" size={30} color="black" style={styles.icon} />
            </TouchableOpacity>

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
    touchableIcon: ViewStyle;
    inputName: ViewStyle;
    inputYear: ViewStyle;
    icon: ViewStyle;
    [key: string]: ViewStyle;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    touchableIcon: {
        backgroundColor: '#e0e0e0',
        width: 40,
        height: 40,
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
        margin: 0,
    },
});
