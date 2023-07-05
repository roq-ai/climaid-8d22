import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPublicUser } from 'apiSdk/public-users';
import { Error } from 'components/error';
import { publicUserValidationSchema } from 'validationSchema/public-users';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PublicUserInterface } from 'interfaces/public-user';

function PublicUserCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PublicUserInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPublicUser(values);
      resetForm();
      router.push('/public-users');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PublicUserInterface>({
    initialValues: {
      donation: 0,
      carbon_emission: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: publicUserValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Public User
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="donation" mb="4" isInvalid={!!formik.errors?.donation}>
            <FormLabel>Donation</FormLabel>
            <NumberInput
              name="donation"
              value={formik.values?.donation}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('donation', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.donation && <FormErrorMessage>{formik.errors?.donation}</FormErrorMessage>}
          </FormControl>
          <FormControl id="carbon_emission" mb="4" isInvalid={!!formik.errors?.carbon_emission}>
            <FormLabel>Carbon Emission</FormLabel>
            <NumberInput
              name="carbon_emission"
              value={formik.values?.carbon_emission}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('carbon_emission', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.carbon_emission && <FormErrorMessage>{formik.errors?.carbon_emission}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'public_user',
    operation: AccessOperationEnum.CREATE,
  }),
)(PublicUserCreatePage);
