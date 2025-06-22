import React, { createContext, useEffect, useState } from 'react';
import { Divider, Stack } from '@mui/material';
import AccordionComponent from '../../../components/accordions/AccordionComponent';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconTextComponent from '../../../components/icontexts/IconTextComponent';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import { Print } from '@mui/icons-material';
import SearchComponent from '../../../components/search/SearchComponent';
import Header from '../../layer1/admin/Header';
import AccordionTableComponent from '../../../components/table/AccordionTableComponent';

export const ReloadTableCustom = createContext();

const AdminTemplateCustom = ({
    formTitle,
    title,
    formIcon = <PersonAddAltOutlinedIcon fontSize="large" color="slateBlue" />,
    queryTitle,
    queryIcon = <AccountCircleOutlinedIcon fontSize="large" color="slateBlue" />,
    formComponent,
    information,
    useTableApi,
    searchComponent,
    setId,
    setUpdateData,
    setIdDelete,
    isUpdate,
    specialSectionTable,
    showHeader = true,
    showAccordionTable
}) => {

    const [searchData, setSearchData] = React.useState('');
    //const [searchType] = React.useState(defaultSearchType);
    const [searchInformation, setSearchInformation] = useState(information)

    useEffect(() => {
        setSearchInformation(information)
    }, [information])

    const handleChange = (value) => {  
        setSearchData(value)
        handleSearch(value)
    }

    // Busqueda temporal en frontend
    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setSearchInformation(information)
            return
        }

        const normalizeString = (str) => {
            return str
                .normalize("NFD") // Normalizar caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos
                .toLowerCase();
        };

        const searchTerms = normalizeString(searchTerm)
            .split(/\s+/) // Dividir por espacios
            .filter(term => term.length > 0); // Eliminar términos vacíos

        if (searchTerms.length === 0) {
            setSearchInformation(null);
            return;
        }

        const filteredBody = information.body.filter(row => {
            const rowValues = Object.values(row)
                .map(value =>
                    typeof value === 'string'
                        ? normalizeString(value)
                        : String(value).toLowerCase()
                )
                .join(' '); // Concatenar todos los valores del registro

            return searchTerms.every(term =>
                rowValues.includes(term)
            );
        });

        setSearchInformation({ ...information, body: filteredBody });
    };

    const handlePrint = () => {
        if (useTableApi?.handleSearch) {
            useTableApi.handleSearch('');
            setSearchData(''); // Envía cadena vacía para recargar todo
        }
    };

    return (
        <>
            {showHeader && <Header text={title} />} {/* Encabezado */}
            <AccordionComponent
                title={formTitle}
                icon={formIcon}
                isUpdate={isUpdate}
            > {/* Desplegable */}
                <ReloadTableCustom.Provider value={{ reload: handlePrint }}>
                    {formComponent}
                </ReloadTableCustom.Provider>
            </AccordionComponent>
            <Divider sx={{ pt: 1, ml: -1, mr: -1 }} />
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignItems: "center",
                    paddingTop: 2,
                    paddingBottom: 2
                }}
            > {/* Consulta de usuarios */}
                <IconTextComponent
                    text={queryTitle}
                    icon={queryIcon}
                />
                <Stack direction="row" spacing={2}
                    sx={{
                        alignItems: "center",
                        flexGrow: 1,
                        justifyContent: "end"
                    }}
                >
                    { specialSectionTable }
                    <ButtonComponent
                        icon={<Print />}
                        label="Imprimir"
                        styleButton="outlined"
                        color="coolGray"
                        onClick={handlePrint} // Agrega este onClick
                    />
                    {searchComponent || (
                        <>
                            {/* Selector de tipo de búsqueda si es necesario */}
                            <SearchComponent
                                width="50%"
                                value={searchData}
                                onChange={handleChange} // Cambio crucial aquí
                                placeholder="Presiona Enter para buscar..."
                            />
                        </>
                    )}
                </Stack>
            </Stack>
            <AccordionTableComponent
                showAccordion={showAccordionTable}
                information={searchInformation} // Pasa el objeto completo
                isLoading={useTableApi?.isLoading}
                error={useTableApi?.error}
                setId={setId}
                setUpdateData={setUpdateData}
                setIdDelete={setIdDelete}
            />
        </>
    );
};

export default AdminTemplateCustom;