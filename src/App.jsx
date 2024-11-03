import { Card, Container, Flex } from "@chakra-ui/react";
import { DataContextProvider } from "./context/DataContext";
import { Header } from "./components/header/header";
import { LeftPanel } from "./components/left-panel/left-panel";
import { RightPanel } from "./components/right-panel/right-panel";
import { SHIRT_SIDE } from "./constants";
import { useMemo, useReducer } from "react";

const initialState = {
  shirt_side: SHIRT_SIDE.FRONT,
  [SHIRT_SIDE.FRONT]: {
    agrega_texto_arriba: false,
    agrega_texto_abajo: false,
    texto_arriba: "Texto de arriba",
    texto_abajo: "Texto de abajo",
    imagen: null,
  },
  [SHIRT_SIDE.BACK]: {
    agrega_texto_arriba: false,
    agrega_texto_abajo: false,
    texto_arriba: "Texto de arriba",
    texto_abajo: "Texto de abajo",
    imagen: null,
  },
};

const reducer = (data, partialData) => ({
  ...data,
  ...partialData,
});

const App = () => {
  const [data, updateData] = useReducer(reducer, initialState);

  const contextValue = useMemo(
    () => ({ data, updateData }),
    [data, updateData]
  );

  console.log({
    shirt_side: data.shirt_side,
    frente: { ...data[SHIRT_SIDE.FRONT] },
    espalda: { ...data[SHIRT_SIDE.BACK] },
    file_front: data[SHIRT_SIDE.FRONT].imagen,
    file_back: data[SHIRT_SIDE.BACK].imagen,
  });

  return (
    <DataContextProvider value={contextValue}>
      <Container width="100%" className="taller-pickles-app">
        <Header />
        <Flex className="body" width="100%" gap="1em" alignContent="flex-start">
          <Card.Root width="50%">
            <Card.Body>
              {/* Preview de la remera */}
              <LeftPanel />
            </Card.Body>
          </Card.Root>
          <Card.Root width="50%">
            <Card.Body>
              {/* Controles de customizacion */}
              <RightPanel />
            </Card.Body>
          </Card.Root>
        </Flex>
      </Container>
    </DataContextProvider>
  );
};

export default App;
