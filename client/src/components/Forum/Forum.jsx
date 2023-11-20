import { useEffect, useState } from "react";
import ForumView from '../../views/ForumView/ForumView';
import { useDispatch, useSelector } from "react-redux";
import { clearQuestionDetail, getQuestions } from "../../Redux/actions/questionsActions";

function Forum() {
    const questions = useSelector(state => state.questions?.questions)
    const dispatch = useDispatch()
    const questionDetail = useSelector(state => state.questions?.questionDetail)
    const [loading, setLoading ] = useState(false)

    useEffect(() => {

        if (questionDetail) {
            dispatch(clearQuestionDetail())
        }
    }, [dispatch, questionDetail])
    useEffect(() => {
        setLoading(true)
       if(!questions){
        dispatch(getQuestions())
       }
       if(questions){
        setLoading(false)
       }
    }, [dispatch, questions, setLoading])
    return <ForumView questions={questions} loading={loading}/>
}

export default Forum;
