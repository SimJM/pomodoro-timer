import React, {useState, useEffect} from "react";
import {Box, Button, Flex, Heading, Text, useToast} from "@chakra-ui/react";
import notificationSound from "./notificationSound.mp3";

interface TimerProps {
	workTime: number;
	breakTime: number;
}

const Timer: React.FC<TimerProps> = ({workTime, breakTime}) => {
	const [time, setTime] = useState(workTime);
	const [isRunning, setIsRunning] = useState(false);
	const [isWorkTime, setIsWorkTime] = useState(true);
	const [cycles, setCycles] = useState(0);
	const toast = useToast();

	const showToast = (message: string) => {
		toast({
			title: message,
			status: "info",
			duration: 3000,
			isClosable: true,
		});
	};

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;

		const handleTimerLogic = () => {
			if (time === 0) {
				playNotificationSound();
				setIsWorkTime((prevIsWorkTime) => !prevIsWorkTime);
				setCycles((prevCycles) => prevCycles + (isWorkTime ? 1 : 0));
				setTime(isWorkTime ? breakTime : workTime);
				showToast(isWorkTime ? "Work Time ended" : "Break Time ended");
			} else {
				setTime((prevTime) => prevTime - 1);
			}
		};

		if (isRunning) {
			interval = setInterval(handleTimerLogic, 1000);
		} else {
			if (interval) clearInterval(interval);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, time, workTime, breakTime, isWorkTime, showToast]);

	const startPauseTimer = () => {
		setIsRunning((prevState) => !prevState);
	};

	const resetTimer = () => {
		setIsRunning(false);
		setTime(workTime);
		setIsWorkTime(true);
		setCycles(0);
	};

	const playNotificationSound = () => {
		const audio = new Audio(notificationSound);
		audio.play();
	};

	return (
		<Flex
			minH="100vh"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			gap={6}
			bgGradient="linear(to-b, blue.300, gray.300)">
			<Heading
				as="h1"
				size="2xl"
				fontWeight="thin"
				textTransform="uppercase">
				Pomodoro Timer
			</Heading>
			<Flex
				w="400px"
				bgGradient="linear(to-b, gray.200, gray.400)"
				p={{base: 6, md: 9, lg: 12}}
				rounded="2xl"
				alignItems="center"
				flexDirection="column"
				shadow="dark-lg">
				<Box textAlign="center">
					<Text
						fontWeight="bold"
						fontSize="7xl"
						letterSpacing="wider">
						{`${Math.floor(time / 60)
							.toString()
							.padStart(2, "0")}:${(time % 60)
							.toString()
							.padStart(2, "0")}`}
					</Text>
					<Text fontSize="lg" fontWeight="bold" mb={4}>
						{isWorkTime ? "Work Time" : "Break Time"}
					</Text>
					<Button
						onClick={startPauseTimer}
						colorScheme={isRunning ? "red" : "green"}
						textTransform="uppercase"
						fontWeight="light">
						{isRunning ? "Pause" : "Start"}
					</Button>
					<Button
						onClick={resetTimer}
						colorScheme="blue"
						textTransform="uppercase"
						fontWeight="light"
						mx={2}>
						Reset
					</Button>
					<Text fontSize="md" mt={4}>
						Cycles: {cycles}
					</Text>
				</Box>
			</Flex>
		</Flex>
	);
};

export default Timer;
