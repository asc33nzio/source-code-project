import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    FormLabel,
    Textarea,
    Text,
    Radio,
    RadioGroup,
    Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const WriteArticle = () => {
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login_user");
        }
    }, [token, navigate]);

    useEffect(() => {
        axios
            .get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert('Category list unavailable. API endpoint not responding');
            });
    }, []);

    const initialValues = {
        title: '',
        content: '',
        country: '',
        CategoryId: '',
        url: '',
        keywords: '',
        file: null,
    };

    const supportedExtensions = ['jpg', 'jpeg', 'png'];

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
        country: Yup.string().required('Country is required'),
        CategoryId: Yup.number().required('Category ID is required'),
        url: Yup.string().url('Invalid URL format'),
        keywords: Yup.string().required('Keywords are required'),
        file: Yup.mixed()
            .required('File is required')
            .test('fileSize', 'File size should be less than 1MB', (value) => {
                return value && value.size <= 1 * 1024 * 1024;
            })
            .test('fileFormat', 'Only JPG, JPEG, and PNG files are supported', (value) => {
                if (!value) {
                    // No file provided
                    return true;
                }

                const fileExtension = value.name.split('.').pop().toLowerCase();
                return supportedExtensions.includes(fileExtension);
            }),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const header = {
                Authorization: `Bearer ${token}`,
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(values));
            formData.append('file', values.file); // Pass the file object directly

            const response = await axios.post(
                'https://minpro-blog.purwadhikabootcamp.com/api/blog',
                formData,
                {
                    headers: {
                        ...header,
                        'Content-Type': 'multipart/form-data', // Set the Content-Type header
                    },
                }
            );

            console.log("Nice.")
            console.log(response.data.data.title);
            console.log(response.data.message);

            alert('Article posted. This better be good.');

            // Reset form values
            formik.resetForm();
            setSubmitting(true);
            navigate('/');
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleContentChange = (event) => {
        formik.setFieldValue('content', event.target.value);
    };

    return (
        <Flex height="100vh" bg={'black'} color={'#88012A'} fontFamily={'monospace'}>

            <Box width="50vw" border="8px double #A09006" p="4">
                <form onSubmit={formik.handleSubmit}>
                    <Text textAlign={'center'} fontSize={'40px'} color={'yellow'}>
                        Write something nice. Or not.
                    </Text>
                    <FormControl id="content" isInvalid={formik.touched.content && formik.errors.content}>
                        <FormLabel pt={14} fontSize={'23px'}>What's on your mind?:</FormLabel>
                        <Textarea
                            id="content"
                            name="content"
                            onChange={handleContentChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.content}
                            height="15rem"
                            maxHeight={'15rem'}
                            color={'#259A80'}
                            placeholder="Write something cool. Maximum 300 characters long or its no good. Running servers ain't cheap. Also, you can use inherent HTML tags in your article such as <b>Your bold text here</b> or <br> at the end of a sentence to create a line break."
                        />
                        <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="title" isInvalid={formik.touched.title && formik.errors.title}>
                        <FormLabel pt={8} fontSize={'23px'}>Title:</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            color={'#259A80'}
                            placeholder='Hmm.. what should we call this article?'
                        />
                        <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="country" isInvalid={formik.touched.country && formik.errors.country}>
                        <FormLabel pt={8} fontSize={'23px'}>Country:</FormLabel>
                        <Input
                            type="text"
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                            color={'#259A80'}
                            placeholder='Tell us where this event is happening.'
                        />
                        <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
                    </FormControl>
                </form>
            </Box>

            <Box width={"50vw"} border={"8px double #A09006"} p={4} fontFamily={'monospace'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl
                        id="CategoryId"
                        isInvalid={formik.touched.CategoryId && formik.errors.CategoryId}
                    >
                        <FormLabel textAlign={'center'} pt={5} fontSize={'27px'}>Categories:</FormLabel>
                        <RadioGroup
                            onChange={(value) => formik.setFieldValue('CategoryId', value)}
                            value={formik.values.CategoryId}
                        >
                            <Stack direction="row" color='#259A80' justifyContent={'center'} pt={5} overflow={false}>
                                {categories.map((category) => (
                                    <Radio key={category.id} value={category.id.toString()} colorScheme="yellow">
                                        {category.name}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                        <FormErrorMessage>{formik.errors.CategoryId}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                        id="keywords"
                        isInvalid={formik.touched.keywords && formik.errors.keywords}
                    >
                        <FormLabel pt={10} fontSize={'23px'}>Keywords:</FormLabel>
                        <Input
                            type="text"
                            name="keywords"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.keywords}
                            color={'#259A80'}
                            placeholder='Let everyone know what this thing is all about.'
                        />
                        <FormErrorMessage>{formik.errors.keywords}</FormErrorMessage>
                    </FormControl>

                    <Stack direction={'row'}>
                        <FormControl id="file" isInvalid={formik.touched.file && formik.errors.file}>
                            <FormLabel textAlign={'center'} pt={50} fontSize={'22px'}>Upload an Image Below 1mb:</FormLabel>
                            <Input
                                pt={2}
                                type="file"
                                name="file"
                                variant="center"
                                colorScheme="yellow"
                                onChange={(event) => formik.setFieldValue('file', event.target.files[0])}
                            />
                            <FormErrorMessage>{formik.errors.file}</FormErrorMessage>
                        </FormControl>
                    </Stack>


                    <Stack direction={'row'} mt={200} justifyContent={'space-between'}>
                        <Button onClick={() => navigate('/')} mt="4" colorScheme={'yellow'}>
                            Return Home
                        </Button>
                        <Button type="submit" disabled={formik.isSubmitting} mt="4" colorScheme={'yellow'}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>

        </Flex>
    );
};
