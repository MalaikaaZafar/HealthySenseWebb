const searchStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        width: 250,
        backgroundColor: '#ededed',
        borderRadius: 5,

    },
    searchBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '70%',
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 1,
        width: '100%',
    },
    textField: {
        marginRight: 1,
        borderRadius: 3,
        flexGrow: 1,
        width: '70%',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 3,
            },
            '&:hover fieldset': {
                borderColor: '#2854C3',
                borderRadius: 3,


            },
            '&.Mui-focused fieldset': {
                borderColor: '#2854C3',
                borderRadius: 3,

            },
        },
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        marginRight: 1,
        textTransform: 'none',
        color: '#000',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2854C3',
        borderStyle: 'solid',

        '&:hover': {
            backgroundColor: '#2854C3',
            color: '#fff'
        }

    },
    filter: {
        textTransform: 'none',
        color: '#fff',
        backgroundColor: '#2854C3',
        borderRadius: 2,
        borderWidth: 2,
        fontSize: 15,
        borderColor: '#2854C3',
        borderStyle: 'solid',

        '&:hover': {
            backgroundColor: '#2854C3',
            color: '#fff'
        }
    },
    applyButton: {
        textTransform: 'none',
        color: '#fff',
        backgroundColor: '#2854C3',
        borderRadius: 2,
        borderWidth: 2,
        fontSize: 15,
        borderColor: '#2854C3',
        borderStyle: 'solid',
        marginTop: 1,
        selfAlign: 'center',

    }

};

export default searchStyles;