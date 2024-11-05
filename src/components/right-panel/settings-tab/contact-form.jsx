import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../ui/checkbox";
import { countries, localidades, provincias } from "../../../utils/data";
import { Field } from "../../../components/ui/field";
import { Fieldset, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useDataContext } from "../../../context/DataContext";
import { useMemo } from "react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../components/ui/native-select";

export const ContactForm = () => {
  const { data, updateData } = useDataContext();
  const { customer } = data;

  const handleSubmit = async () => {
    // const host = "https://nominatim.openstreetmap.org";
    // const address = "caracas+2712+martinez";
    // const url = `${host}/search?addressdetails=1&namedetails=1&extratags=1&q=${address}&format=jsonv2&limit=1`;
    // const data = await fetch(url)
    //   .then((res) => res.json())
    //   .catch(console.error);

    // const result = {
    //   display_name: data[0]?.display_name || null,
    //   address: data[0]?.address || null,
    //   extratags: data[0]?.extratags || null,
    // };

    const orderedCustomer = {
      nombre: customer?.name,
      email: customer?.email,
      telefono: customer?.phone,
      whatsapp: customer?.whatsapp,
      pais: countries.filter(({ code }) => code === customer.country)[0]?.name,
      provincia: provincias.filter(({ code }) => customer?.province === code)[0]
        ?.name,
      localidad: localidades.filter(
        ({ id }) => customer?.city === id.toString()
      )[0]?.name,
    };

    console.log({ orderedCustomer, customer });

    return orderedCustomer || {};
  };

  const updateCustomer = (partialData) => {
    updateData({
      customer: {
        ...customer,
        ...partialData,
      },
    });
  };

  const memoizedCountries = useMemo(() => countries, []);
  const memoizedProvincias = useMemo(() => provincias, []);
  const memoizedLocalidades = useMemo(() => localidades, []);

  return (
    <Flex flexDir="column">
      <Heading size="md" mb="2em">
        Donde mandamos tu remera?
      </Heading>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Detalles de contacto</Fieldset.Legend>
          <Fieldset.HelperText>
            Necesitamos estos datos para poder enviarte tu remera.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field label="Nombre y Apellido" required>
            <Input
              name="name"
              onChange={(e) => updateCustomer({ name: e.currentTarget.value })}
            />
          </Field>

          <Field label="Dirección de Email" required>
            <Input
              name="email"
              type="email"
              onChange={(e) => updateCustomer({ email: e.currentTarget.value })}
            />
          </Field>

          <Field label="Teléfono" required>
            <Input
              name="phone"
              type="tel"
              onChange={(e) => updateCustomer({ phone: e.target.value })}
            />
          </Field>

          <Field label="">
            <Flex align="center" gap="1em">
              <Text fontWeight="bold" color="green.600">
                Tenés WhatsApp?
              </Text>
              <Checkbox
                name="whatsapp"
                onCheckedChange={({ checked }) => {
                  updateCustomer({ whatsapp: checked });
                }}
                checked={customer.whatsapp}
              />
            </Flex>
          </Field>

          <Field label="País" required>
            <NativeSelectRoot>
              <NativeSelectField
                value={customer.country}
                onChange={(e) => updateCustomer({ country: e.target.value })}
              >
                {memoizedCountries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>

          <Field label="Provincia/State" required>
            {customer.country === "ARG" && (
              <NativeSelectRoot>
                <NativeSelectField
                  value={customer.province}
                  placeholder="Selecciona una provincia"
                  onChange={(e) => updateCustomer({ province: e.target.value })}
                >
                  {memoizedProvincias.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            )}
            {customer.country !== "ARG" && (
              <Input
                name="province"
                onChange={(e) => updateCustomer({ province: e.target.value })}
              />
            )}
          </Field>

          <Field label="Localidad" required>
            {customer.country === "ARG" && (
              <NativeSelectRoot>
                <NativeSelectField
                  value={customer.city}
                  placeholder="Selecciona una localidad"
                  onChange={(e) => updateCustomer({ city: e.target.value })}
                >
                  {memoizedLocalidades.map((locality) => (
                    <option key={locality.id} value={locality.id}>
                      {locality.name}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            )}
            {customer.country !== "ARG" && (
              <Input
                name="city"
                onChange={(e) => updateCustomer({ city: e.target.value })}
              />
            )}
          </Field>

          <Field label="Código postal" required>
            <Input
              name="postal_code"
              onChange={(e) => updateCustomer({ postal_code: e.target.value })}
            />
          </Field>

          <Field label="Calle" required>
            <Input
              name="address"
              onChange={(e) => updateCustomer({ address: e.target.value })}
            />
          </Field>
        </Fieldset.Content>

        <Button alignSelf="flex-start" onClick={handleSubmit}>
          Submit
        </Button>
      </Fieldset.Root>
    </Flex>
  );
};
