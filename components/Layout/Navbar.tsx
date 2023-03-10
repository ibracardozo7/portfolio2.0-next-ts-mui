import { useState } from "react"
import {
    AppBar,
    Box,
    Button,
    Container,
    FormControlLabel,
    IconButton,
    Slide,
    Switch,
    Toolbar,
    Typography,
    useMediaQuery,
    useScrollTrigger,
} from "@mui/material";
import {
    Menu as MenuIcon,
    LightMode as Sun,
    DarkMode as Moon,
    Home,
    Work,
    Email,
    AccountBox
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles"
import Link from "next/link";
import NavigationDrawer from "../Drawer"
import Typing from "react-typing-effect"

interface Props {
    children: React.ReactElement
}
interface NavProps {
    mode: boolean;
    toggleMode: () => void;
}

const HideOnScroll = (props: Props) => {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger} >
            {children}
        </Slide>
    )
}

const NavBar = (props: NavProps) => {

    const { mode, toggleMode } = props;
    const {palette, breakpoints} = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery(breakpoints.down("md"));
    const { primary, secondary } = palette;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const Routes = [
        { name: "INICIO", link: "/#", icon: <Home /> },
        { name: "ACERCA DE MI", link: "/#about", icon: <AccountBox /> },
        { name: "PORTAFOLIO", link: "/#portfolio", icon: <Work /> },
        { name: "CONTACTO", link: "/#contactme", icon: <Email /> },
    ]

    return (
        <Box component="section">
            <HideOnScroll>
                <AppBar elevation={0}>
                    <Container maxWidth="lg">
                        <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between"}} >
                            <Typography sx={{display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700}} component="span">
                                {"<"}
                                <Typing 
                                text={["Ibrahim","Xavier","Cardozo"]}
                                speed={50}
                                eraseSpeed={100}
                                typingDelay={1000}
                                eraseDelay={2000}
                                />
                                {" />"}
                            </Typography>
                            <Box sx={{display: "flex"}}>
                                {
                                    isMobile
                                    ? <IconButton
                                        size="large"
                                        sx={{marginLeft: "auto"}}
                                        onClick={handleDrawerToggle}>
                                        <MenuIcon
                                            fontSize="large"
                                            sx={{color: mode
                                                ? secondary.main
                                                : primary.contrastText}} />
                                    </IconButton>
                                    : <>
                                        {
                                            Routes.map(elem =>
                                                <Link href={elem.link} key={elem.name}>
                                                    <Button
                                                        variant="text"
                                                        color={ mode
                                                            ? "secondary"
                                                            : "inherit"}>
                                                        {elem.name}
                                                    </Button>
                                                </Link>)
                                        }
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={mode}
                                                    onChange={toggleMode}
                                                    color="secondary" />
                                            }
                                            label={mode
                                                ? <Sun sx={{ display: 'flex' }} />
                                                : <Moon sx={{ display: 'flex' }} />
                                            }
                                            labelPlacement="start" />
                                    </>
                                }
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
            {
                isMobile &&
                <NavigationDrawer
                    routes={Routes}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    mode={mode}
                    toggleMode={toggleMode} />
            }
        </Box>
    )
}

export default NavBar