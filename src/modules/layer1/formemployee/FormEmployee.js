import Form, { ButtonForm, InputForm, SectionForm, SelectForm } from "../admin/Form";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import useEmployeeCreate from "./useEmployeeCreate";
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import { useEffect, useState, useRef } from "react"; // Agregamos useRef para manejar el input de archivos
import useTypeOfEmployeeOptions from "./useTypeOfEmployeeOptions";
import useFarmOptions from "./useFarmOptions";
import FileModal from "../../../components/modals/FileModal";
import RadioButtonView from "../../../components/radiobuttonsmodalview/RadioButtonView";
import useDocumentList from "../formdocument/useDocumentList";
import useEmployeeDocuments from "./useEmployeeDocuments";
import AddInformationModal from "../../../components/modals/AddInformationModal";
import useEmployeeLabourList from "./useEmployeeLabourList";
import useEmploymentList from "../formemployment/useEmploymentList";
import AddManagerModal from "../../../components/modals/AddManagerModal";
import useAreaFarmList from "./useAreaByFarmList";
import { SelectFormWithOnChange } from "../../../components/selects/SelectFormWithOnChange";
import useAreaByEmployeeList from "./useAreaByEmployeeList";
import SnackbarComponent from "../../../components/snackbar/SnackbarComponent"
import useSnackbarOptions from "../../../hooks/useSnackbarOption"

const FormEmployee = ({ updateData, setUpdateData, isUpdate, setIsUpdate, setUpdate, responseUpdate }) => {
    const { handleCreate, datos } = useEmployeeCreate();
    const { typeEmployeeOptions, optionsE } = useTypeOfEmployeeOptions();
    const { farmOptions, optionsF } = useFarmOptions();
    const { fetchEmployeeDocuments, documents } = useEmployeeDocuments();
    // constante para manejar el estado de abertura del fileModal
    const [isArchivo, setIsArchivo] = useState(false);
    // constante para manejar el estado de abertura del Modal de tipo de archivo
    const [isSelectedFileType, setIsSelectedFileType] = useState(false);
    // constante para manejar el estado de seleccion de tipo de archivo, osea cuando ya se selecciono un tipo de archivo
    const [selectedType, setSelectedType] = useState(false);
    //Estado para el documento seleccionado
    const [selectedItem, setSelectedItem] = useState(null);
    //Estado para el nombre del tipo de documento seleccionado
    const [selectedItemName, setSelectedItemName] = useState("");
    // Estado para almacenar una copia de los archivos antes de abrir el modal
    const [prevArchivos, setPrevArchivos] = useState([]);
    // Estado para almacenar los detalles de los archivos
    const [fileDetails, setFileDetails] = useState([]);
    // Estado para almacenar una copia de los detalles de los archivos antes de abrir el modal
    const [prevFileDetails, setPrevFileDetails] = useState([]);
    // Estado para almacenar los archivos eliminados
    const [deletedFiles, setDeletedFiles] = useState([]);

    const { handleList, processedData } = useDocumentList();
    const { handleList: handleListLabour, processedData: processedDataLabour } = useEmployeeLabourList();
    const { handleList: handleListEmployment, processedData: processedDataEmployment } = useEmploymentList();

    const { handleList: handleListArea, areas: availableAreas, cargando: cargandoAreas } = useAreaFarmList();

    const { handleList: loadAreasForEmployee, areasEmpleado } = useAreaByEmployeeList();


    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenManagerModal, setIsOpenManagerModal] = useState(false);
    const [pendingPuesto, setPendingPuesto] = useState(null);
    const [areasSeleccionadas, setAreasSeleccionadas] = useState([]);
    const [puestoSelectionCount, setPuestoSelectionCount] = useState(0);
    const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
    const [resetModalAreas, setResetModalAreas] = useState(false);

    useEffect(() => {
    if (isUpdate && areasEmpleado.length > 0) {
        const ids = areasEmpleado.map((area) => area.id);
        console.log("IDs de áreas cargados del API:", ids);
        setAreasSeleccionadas(ids);
        setDataValue((prev) => ({
        ...prev,
        areas: ids
        }));
    }
    }, [areasEmpleado, isUpdate]);

    const handleSaveAreas = (idsArray) => {
    console.log("Áreas seleccionadas:", idsArray);
    setDataValue(v => ({
        ...v,
        id_puesto: pendingPuesto,
        areas: idsArray
    }));
    setPendingPuesto(null);
    setIsOpenManagerModal(false);
    };

    const { snackbarOptions, setSnackbarOptions, showMessage} = useSnackbarOptions() 

    const data = {
        id_tipo_trabajador: null,
        id_finca: null,
        id_puesto: null,
        id_labor_trabajador: null,
        nombre: '',
        ap_paterno: '',
        ap_materno: '',
        direccion: '',
        celular: '',
        archivos: []
    }

    const [dataValue, setDataValue] = useState(data);

    const fileInputRef = useRef(null); // Creamos una referencia para el input de archivos

    // Identifica la primera opción
    const jefeDeAreaId = processedDataEmployment.body[0]?.id;

    // cuando la finca cambie en el formulario:
    useEffect(() => {
        if (dataValue.id_finca) {
            handleListArea({ id_finca: dataValue.id_finca });
        }
    }, [dataValue.id_finca, handleListArea]);

    useEffect(() => {
    if (dataValue && dataValue.id_puesto != null) {
        setPuestoSelectionCount(c => c + 1);
    }
    }, [dataValue]);

    useEffect(() => {
        if (dataValue.id_puesto != null) {
            setPuestoSeleccionado(dataValue.id_puesto);
        }
    }, [dataValue.id_puesto]);

    // Callback del modal
    const handleManagerModalSave = (selectedAreasIds) => {
    setDataValue((v) => ({
        ...v,
        id_puesto: pendingPuesto,
        areas: selectedAreasIds,
    }));
    setPendingPuesto(null);
    setIsOpenManagerModal(false);
    };

    const handleManagerModalClose = () => {
    setIsOpenManagerModal(false);
    setPendingPuesto(null);
        setDataValue(v => ({
            ...v,
            id_puesto: null
        }));
    };

    useEffect(() => {
        typeEmployeeOptions();
        farmOptions();
        handleList(); // Llamamos a la función para obtener la lista de documentos
    }, [typeEmployeeOptions, farmOptions, handleList]);

    useEffect(() => {
        handleListLabour('');
    }, [handleListLabour]);

    useEffect(() => {
        handleListEmployment('');
    }, [handleListEmployment]);

    useEffect(() => {
        handleListArea();
    }, [handleListArea]);

    const handleEmploymentChange = (e) => {
        const id = Number(e.target.value);

        // Si no es jefe de área, limpiamos las áreas
        if (id !== jefeDeAreaId) {
            setDataValue(v => ({
            ...v,
            id_puesto: id,
            areas: [] 
            }));
            setAreasSeleccionadas([]); 
            setResetModalAreas(true); 
            setTimeout(() => setResetModalAreas(false), 0);
        } else {
            setDataValue(v => ({ ...v, id_puesto: id }));
        }
    };

    useEffect(() => {
        if (selectedItem !== null) {
            setSelectedType(true);  // Habilitamos el modal de selección de archivo
            if (Array.isArray(processedData.body)) {
                const selectedItemObj = processedData.body.find(item => item.id == selectedItem);
                if (selectedItemObj) {
                    setSelectedItemName(selectedItemObj.nombre);
                } else {
                }
            } else {
            }
        }
    }, [selectedItem, processedData.body]);

    const onSubmitEmployee = (dataValue, isUpdate, handleUpdate) => {
        const payload = {
            ...dataValue,
            id_puesto: puestoSeleccionado,
        };

        if (dataValue.celular.length !== 10) {
            showMessage("Recuerda que tu número debe tener 10 dígitos", "warning")
            return
        }
        
        console.log("Payload final empleado:", payload);
        handleCreate(payload, isUpdate, handleUpdate);
    };

    const selectedFileType = () => {
        setIsSelectedFileType(true);
    }

    const unSelectedFileType = () => {
        setIsSelectedFileType(false);
    }

    // Función que abre la ventana para seleccionar archivos
    const handleFileSelect = () => {
        setPrevArchivos(dataValue.archivos); // Guardamos una copia de los archivos actuales
        setPrevFileDetails(fileDetails); // Guardamos una copia de los detalles de los archivos actuales
        setIsArchivo(true);
    };

    // Función que cierra la ventana de selección de archivos
    const handleFileUnSelect = () => {
        setIsArchivo(false);  // Cierra el modal
        setIsSelectedFileType(false); // Cierra el modal de selección de tipo de archivo
        setSelectedItem(null); // Resetea el documento seleccionado
        setSelectedItemName(""); // Resetea el nombre del tipo de documento seleccionado
        setSelectedType(false); // Resetea el estado de selección de tipo de archivo
        setDataValue(prevData => ({ ...prevData, archivos: prevArchivos })); // Restauramos los archivos desde la copia
        setFileDetails(prevFileDetails); // Restauramos los detalles de los archivos desde la copia
        setDeletedFiles([]); // Limpiamos los archivos eliminados
    };

    const handleFileUnSelectWithAnyChanges = () => {
        setIsArchivo(false);
    }

    //Función que activa el input de archivos
    const selectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Función que maneja los archivos seleccionados por el usuario
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Obtiene los archivos seleccionados
        if (files.length > 0) {
            const readers = files.map(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file); // Lee el archivo como Base64
                return new Promise((resolve, reject) => {
                    reader.onload = () => resolve({ name: file.name, archivo: reader.result });
                    reader.onerror = reject;
                });
            });

            Promise.all(readers).then(results => {
                setDataValue(prevData => ({
                    ...prevData,
                    archivos: [...prevData.archivos, ...results.map(result => ({ id_documento: Number(selectedItem), archivo: result.archivo }))] // Agrega los archivos en base64 al estado
                }));
                setFileDetails(prevDetails => [
                    ...prevDetails,
                    ...results.map(result => ({
                        name: result.name,
                        tipo_documento: selectedItemName
                    }))
                ]);
                setSelectedItem(null); // Resetea el documento seleccionado
                setSelectedItemName(""); // Resetea el nombre del tipo de documento seleccionado
                setSelectedType(false); // Resetea el estado de selección de tipo de archivo
            }).catch(error => {
            });
        }
    };

    const removeFile = (fileName) => {
        const fileIndex = fileDetails.findIndex(detail => detail.name === fileName);
        if (fileIndex !== -1) {
            const fileToRemove = dataValue.archivos[fileIndex];
            setDeletedFiles(prevDeletedFiles => [...prevDeletedFiles, fileToRemove]);
            setDataValue(prevData => ({
                ...prevData,
                archivos: prevData.archivos.filter((_, index) => index !== fileIndex)
            }));
            setFileDetails(prevDetails => prevDetails.filter((_, index) => index !== fileIndex));
        }
    };

    const resetForm = () => {
        setDataValue(data);
        setIsUpdate(false);
        setFileDetails([]);
        setDeletedFiles([]);
        setAreasSeleccionadas([]);
        setPuestoSeleccionado(null);
        setPendingPuesto(null);

        // Señal para borrar en el modal de áreas
        setResetModalAreas(true);
        setTimeout(() => setResetModalAreas(false), 0);
    };

    useEffect(() => {
        if (isUpdate && updateData.id) {
            setDataValue((prevState) => ({
                ...prevState,
                id_tipo_trabajador: updateData.id_tipo_trabajador ?? prevState.id_tipo_trabajador,
                id_finca: updateData.id_finca ?? prevState.id_finca,
                id_puesto: updateData.id_puesto,
                id_labor_trabajador: updateData.id_labor_trabajador,
                nombre: updateData.nombre ?? prevState.nombre,
                ap_paterno: updateData.ap_paterno ?? prevState.ap_paterno,
                ap_materno: updateData.ap_materno ?? prevState.ap_materno,
                direccion: updateData.direccion ?? prevState.direccion,
                celular: updateData.celular ?? prevState.celular,
                archivos: updateData.archivos ?? prevState.archivos,
                areas: dataValue.areas || []
            }));
            
                loadAreasForEmployee({ idEmpleado: updateData.id });
            if (updateData.archivos) {
                setFileDetails(updateData.archivos.map(archivo => ({
                    name: archivo.archivo,
                    tipo_documento: archivo.documento?.nombre || 'Desconocido'
                })));
            }

            // Obtener documentos del trabajador
            fetchEmployeeDocuments(updateData.id);
        }
    }, [isUpdate, updateData, fetchEmployeeDocuments, loadAreasForEmployee]);

    useEffect(() => {
    if (isUpdate && areasEmpleado.length > 0) {
        const ids = areasEmpleado.map((area) => area.id);
        setAreasSeleccionadas(ids);
    }
    }, [areasEmpleado, isUpdate]);

    useEffect(() => {
        if (documents.length > 0) {
            setFileDetails(documents.map(doc => ({
                name: doc.archivo,
                tipo_documento: doc.nombre
            })));
            setDataValue(prevData => ({
                ...prevData,
                archivos: documents
            }));
        }
    }, [documents]);

    const handleFormUpdate = () => {
        setUpdateData((prevState) => ({
            ...prevState,
            id_tipo_trabajador: dataValue.id_tipo_trabajador,
            id_finca: dataValue.id_finca,
            id_puesto: dataValue.id_puesto,
            id_labor_trabajador: dataValue.id_labor_trabajador,
            nombre: dataValue.nombre,
            ap_paterno: dataValue.ap_paterno,
            ap_materno: dataValue.ap_materno,
            direccion: dataValue.direccion,
            celular: dataValue.celular,
            archivos: dataValue.archivos,
            areas: dataValue.areas || [],
            existingFiles: prevArchivos,
            newFiles: dataValue.archivos.filter(file => !prevArchivos.includes(file)),
            deletedFiles: deletedFiles
        }));
        setUpdate(true);
        resetForm();
    };

    const formApi = {
        handleCreate: onSubmitEmployee,
        dataValue,
        response: datos,
        resetForm,
        responseUpdate,
        isUpdate,
        handleFormUpdate
    };

    useEffect(() => {
        console.log("Estado dataValue tras elegir áreas:", dataValue);
    }, [dataValue.areas]);

    const dataLabour = processedDataLabour.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre };
    });

    const dataEmployment = processedDataEmployment.body.map(body => {
        const id = body.id;
        const nombre = body.nombre;

        return { id, nombre };
    });

    const dataAddInformation = [
        { id: 1, nombre: "Nombre 1" },
        { id: 2, nombre: "Nombre 2" },
        { id: 3, nombre: "Nombre 3" }
    ];

    return (
        <>
            <Form useFormApi={() => ({ ...formApi })} isAddInformation={true} setIsOpenModal={setIsOpenModal}>
                <SectionForm title="Personales"
                    icon={<PersonRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
                >
                    <InputForm title="Nombre" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="nombre" />
                    <InputForm title="Apellido Paterno" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="ap_paterno" />
                    <InputForm title="Apellido Materno" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="ap_materno" />
                </SectionForm>

                <SectionForm title="Área"
                    icon={<CasesRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
                >
                    <SelectForm
                        title="Tipo de Trabajador (Seleccione una opción)"
                        isRequired
                        options={optionsE}
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        fieldName="id_tipo_trabajador"
                    />
                    <SelectForm
                        title="Finca (Seleccione una opción)"
                        isRequired
                        options={optionsF}
                        dataValue={dataValue}
                        setDataValue={setDataValue}
                        fieldName="id_finca"
                    />

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <SelectFormWithOnChange
                        title="Puesto"
                        isRequired
                        options={processedDataEmployment.body.map(o => ({ id: o.id, nombre: o.nombre }))}
                        value={dataValue.id_puesto}
                        onChange={handleEmploymentChange}
                        disabled={!dataValue.id_finca}
                        fieldName="id_puesto"
                        onJefeClick={() => {
                            setPendingPuesto(jefeDeAreaId);
                            setIsOpenManagerModal(true);
                        }}
                        />

                        <SelectForm
                            title="Labor"
                            isRequired
                            options={dataLabour}
                            dataValue={dataValue}
                            setDataValue={setDataValue}
                            fieldName="id_labor_trabajador"
                        />
                    </div>

                </SectionForm>
                <SectionForm title="Contacto"
                    icon={<PhoneRoundedIcon sx={{ fontSize: "45px" }} color="slateBlue" />}
                >
                    <InputForm title="Número de Télefono" isRequired type="number" setDataValue={setDataValue} dataValue={dataValue} fieldName="celular" />
                    <InputForm title="Dirección" isRequired setDataValue={setDataValue} dataValue={dataValue} fieldName="direccion" />

                    {/* Input de tipo file oculto, solo se activa al hacer clic en el botón */}
                    <input
                        type="file"
                        ref={fileInputRef} // Asignamos la referencia para poder activarlo con código
                        style={{ display: "none" }} // Lo ocultamos visualmente
                        accept=".pdf,.jpg,.gif,.webp,.txt,.png"
                        onChange={handleFileChange} // Detecta cuando se selecciona un archivo
                    />

                    {/* Botón que abre la ventana para seleccionar archivos */}
                    <ButtonForm
                        title="Añadir Archivos"
                        icon={<NoteAddRoundedIcon />}
                        color={dataValue.archivos.length > 0 ? "green" : "skyBlue"}  // Cambia el color según si hay archivos seleccionados
                        onClick={handleFileSelect} // Llama a la función para abrir el selector de archivos
                    />

                    <RadioButtonView
                        title="Tipos de documentos"
                        isOpen={isSelectedFileType}
                        onClose={unSelectedFileType}
                        items={processedData.body}  // Pasamos los objetos completos, no solo el nombre
                        selectedItem={selectedItem}
                        onSelect={setSelectedItem}  // La función que actualiza el documento seleccionado
                    />

                    <FileModal
                        isOpen={isArchivo}
                        onCloseWithAnyChanges={handleFileUnSelectWithAnyChanges}
                        onClose={handleFileUnSelect}
                        onSelectFile={selectFile}
                        selectedFileType={selectedFileType}
                        selectType={selectedType}
                        archivos={dataValue.archivos} // Pasamos los archivos seleccionados al modal
                        removeFile={removeFile} // Pasamos la función para eliminar archivos
                        selectedItemName={selectedItemName} // Pasamos el nombre del tipo de documento seleccionado
                        fileDetails={fileDetails} // Pasamos los detalles de los archivos al modal
                        SectionForm={SectionForm}
                    />
                    {<AddInformationModal open={isOpenModal} setIsOpenModal={setIsOpenModal} SectionForm={SectionForm} data={dataAddInformation} />}
                </SectionForm>
            </Form>
                <AddManagerModal
                    open={isOpenManagerModal}
                    setIsOpenModal={setIsOpenManagerModal}
                    dataArea={availableAreas}
                    saveAreas={handleManagerModalSave}
                    onCloseCustom={handleManagerModalClose}
                    isEditing={isUpdate}
                    initialSelectedIds={areasSeleccionadas}
                    resetTrigger={resetModalAreas} 
                />
            <SnackbarComponent snackbarOptions={snackbarOptions} setSnackbarOptions={setSnackbarOptions} />
        </>
    );
};

export default FormEmployee;
