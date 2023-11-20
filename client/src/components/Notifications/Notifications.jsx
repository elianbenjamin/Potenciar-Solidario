import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom'
import './notification.css';
const Notifications = () => {
    const navigate = useNavigate();
    const answerComments = useSelector(state => state.answerComments);
    //notificaciones de respuestas con antd y renderizado en el portal
    useEffect(() => {
        const currentAnswerComments = answerComments?.Comments;
        const newAnswerComments = answerComments?.Comments;
        const newNotifications = newAnswerComments?.filter(
            (element) =>
                !currentAnswerComments?.some(
                    (element2) => element2.id === element.id
                )
        );
        newNotifications?.forEach((newNotification) => {
            notification.open({
                message: `Nueva respuesta de ${newNotification?.User?.name}`,
                description: createPortal(newNotification?.answer),
                maxCount: 5,
            });
        });
    }, [answerComments, navigate]);

    return null;
};

export default Notifications;
