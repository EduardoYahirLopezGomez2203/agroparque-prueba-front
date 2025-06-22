import { Box, Divider, Stack } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconTextComponent from '../../../components/icontexts/IconTextComponent';
import AccordionComponent from '../../../components/accordions/AccordionComponent';

const BasicAdminContent = ({
    showAccordion = true,
    queryTitle,
    formTitle,
    formIcon = <AccountCircleOutlinedIcon fontSize="large" color="slateBlue" />,
    queryIcon = <AccountCircleOutlinedIcon fontSize="large" color="slateBlue" />,
    formComponent,
    tableComponent,
    openAccordion,
    specialSectionTable
}) => {

    return (
        <>
            {showAccordion ? (<AccordionComponent
                title={formTitle}
                icon={formIcon}
                isUpdate={openAccordion}
            >
                {formComponent}
            </AccordionComponent>) : (
                formComponent
            )}

            <Divider sx={{ pt: 1, ml: -1, mr: -1 }} />

            <Stack
                direction="column"
                sx={{
                    alignItems: "flex-start",
                    paddingTop: 2,
                    paddingBottom: 2
                }}
            >
                <IconTextComponent text={queryTitle} icon={queryIcon} />

                <Divider sx={{ backgroundColor: "#9AA0A8", height: "2px", width: "100%", marginTop: 0.5 }} />
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "100%",
                        alignSelf: "flex-end",
                        paddingTop: specialSectionTable ? 2 : 0,
                    }}
                >
                    {specialSectionTable}
                </Stack>
                <Box sx={{ width: "100%", marginTop: 2 }}>
                    {tableComponent}
                </Box>
            </Stack>
        </>
    );
}

export default BasicAdminContent;