
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Toast from 'react-native-toast-message';

// const AddCardForReview = () => {
//   // Individual state for each field
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [reviewCode, setReviewCode] = useState('');
//   const [selectedType, setSelectedType] = useState('');
//   const [contentType, setContentType] = useState('');

//   // Selection options
//   const typeOptions = ['Blog', 'Article', 'News', 'Tutorial'];
//   const contentTypeOptions = ['Technical', 'Non-Technical', 'Marketing', 'Design'];

//   // Function to validate all fields
//   const validateFields = () => {
//     if (!title || !description || !reviewCode || !selectedType || !contentType) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Please fill in all fields',
//         position: 'bottom',
//       });
//       return false;
//     }
//     return true;
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     if (validateFields()) {
//       // Here you can add your API call or data processing logic
//       Toast.show({
//         type: 'success',
//         text1: 'Success',
//         text2: 'Card added for review',
//         position: 'bottom',
//       });

//       // Clear all fields after successful submission
//       setTitle('');
//       setDescription('');
//       setReviewCode('');
//       setSelectedType('');
//       setContentType('');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.mainTitle}>Create Review Card</Text>

//       <View style={styles.formContainer}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Title</Text>
//           <TextInput
//             style={styles.input}
//             value={title}
//             onChangeText={setTitle}
//             placeholder="Enter title"
//             placeholderTextColor="#666"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Enter description"
//             placeholderTextColor="#666"
//             multiline
//             numberOfLines={4}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Review Code</Text>
//           <TextInput
//             style={styles.input}
//             value={reviewCode}
//             onChangeText={setReviewCode}
//             placeholder="Enter review code"
//             placeholderTextColor="#666"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Selection Type</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedType}
//               onValueChange={(itemValue) => setSelectedType(itemValue)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select type" value="" />
//               {typeOptions.map((type) => (
//                 <Picker.Item key={type} label={type} value={type} />
//               ))}
//             </Picker>
//           </View>
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Content Type</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={contentType}
//               onValueChange={(itemValue) => setContentType(itemValue)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select content type" value="" />
//               {contentTypeOptions.map((type) => (
//                 <Picker.Item key={type} label={type} value={type} />
//               ))}
//             </Picker>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitButtonText}>Submit Review</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   mainTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     textAlign: 'center',
//     marginVertical: 20,
//     letterSpacing: 0.5,
//   },
//   formContainer: {
//     padding: 20,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#34495e',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#bdc3c7',
//     color: '#2c3e50',
//     fontSize: 16,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#bdc3c7',
//     overflow: 'hidden',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   submitButton: {
//     backgroundColor: '#3498db',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default AddCardForReview;
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebase/firebase';

const AddCardForReview = () => {
    // States for form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reviewCode, setReviewCode] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [contentType, setContentType] = useState('');
    const [response, setResponse] = useState(null);

    // Options for dropdowns
    const typeOptions = ['Normal', 'Daily', 'Weekly', 'Monthly'];
    const contentTypeOptions = ['AI Generated', 'PYQ', 'NCERT',];

    // Validate all fields
    const validateFields = () => {
        if (!title || !description || !reviewCode || !selectedType || !contentType) {
            ToastAndroid.showWithGravity(
                'Please fill all fields!',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = () => {

        if (validateFields()) {
            // Mock API response

            db.collection("SAMAISections").add({
                name: title,
                description: description,
                addedOn: new Date(),
                type: testtype,
                reviewCode: reviewCode,
                from: contentType,
            });
            const mockResponse = {
                title,
                description,
                reviewCode,
                type: selectedType,
                contentType,
                status: 'Submitted',
            };

            setResponse(mockResponse);

            ToastAndroid.showWithGravity(
                'Review card added successfully!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );

            // Clear all fields
            setTitle('');
            setDescription('');
            setReviewCode('');
            setSelectedType('');
            setContentType('');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.mainTitle}>Add Card For Review</Text>

            {/* Title Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                    placeholderTextColor="#666"
                />
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={4}
                />
            </View>

            {/* Review Code Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Review Code</Text>
                <TextInput
                    style={styles.input}
                    value={reviewCode}
                    onChangeText={setReviewCode}
                    placeholder="Enter review code"
                    placeholderTextColor="#666"
                />
            </View>

            {/* Type Dropdown */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Type</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedType}
                        onValueChange={(itemValue) => setSelectedType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select type" value="" />
                        {typeOptions.map((type) => (
                            <Picker.Item key={type} label={type} value={type} />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Content Type Dropdown */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Content Type</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={contentType}
                        onValueChange={(itemValue) => setContentType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select content type" value="" />
                        {contentTypeOptions.map((type) => (
                            <Picker.Item key={type} label={type} value={type} />
                        ))}
                    </Picker>
                </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>

            {/* Response Display */}
            {response && (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseTitle}>Submitted Review:</Text>
                    <Text style={styles.responseText}>Title: {response.title}</Text>
                    <Text style={styles.responseText}>Description: {response.description}</Text>
                    <Text style={styles.responseText}>Review Code: {response.reviewCode}</Text>
                    <Text style={styles.responseText}>Type: {response.type}</Text>
                    <Text style={styles.responseText}>Content Type: {response.contentType}</Text>
                    <Text style={styles.responseStatus}>Status: {response.status}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#333',
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    responseContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    responseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    responseText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    responseStatus: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default AddCardForReview;