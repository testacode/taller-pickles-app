import { Flex, Input, Text } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { useDataContext } from "../../context/DataContext";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";

const baseStyle = {
  alignItems: "center",
  borderColor: "#6f6e6e",
  borderRadius: "7px",
  borderStyle: "dashed",
  borderWidth: 2,
  display: "flex",
  flex: 1,
  flexDirection: "column",
  outline: "none",
  padding: "20px",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export const Dropzone = () => {
  const { data, updateData } = useDataContext();
  const { shirt_side } = data;

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/gif": [".gif"],
        "image/jpeg": [".jpeg", ".jpg"],
      },
      maxFiles: 1,
      maxSize: 10485760, // 10MB
      multiple: false,
      onDropAccepted: (files) => {
        const file = files[0];
        updateData({
          [shirt_side]: {
            ...data[shirt_side],
            imagen: file,
          },
        });
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Flex
      align="center"
      bg="gray.muted"
      className="uploader"
      flexDir="column"
      gap="2"
      justify="center"
      m="1em 0"
      p="4"
      rounded="l3"
    >
      <Flex {...getRootProps({ style })} flexDir="column">
        <Input {...getInputProps()} />
        <LuImagePlus size="100" color="grey" />
        <Text color="grey">Tocá o arrastrá una imágen hasta acá</Text>
      </Flex>
    </Flex>
  );
};
