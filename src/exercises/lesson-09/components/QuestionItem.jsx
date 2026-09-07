import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Edit/Delete functionality for a single question
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  // Draft text for options being edited, keyed by option index
  const [optionDrafts, setOptionDrafts] = useState({});
  const { state, dispatch } = useContext(SurveyContext);

  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // Toggle this question in and out of edit mode
  const handleEdit = () => {
    if (isEditing) {
      handleCancel();
      return;
    }
    setWorkingText(question.question);
    setOptionDrafts({});
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: question.id },
    });
  };

  const handleCancel = () => {
    setWorkingText(question.question);
    setOptionDrafts({});
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText: workingText },
    });
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch({ type: 'DELETE_QUESTION', payload: { id: question.id } });
    }
  };

  const handleSaveOption = (optionIndex) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex,
        newText: optionDrafts[optionIndex] ?? question.options[optionIndex],
      },
    });
    setOptionDrafts({});
  };

  const handleDeleteOption = (optionIndex) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { questionId: question.id, optionIndex },
    });
    // Indexes shift after a delete, so drop any drafts
    setOptionDrafts({});
  };

  const handleAddOption = () => {
    const optionText = prompt('Enter the new option text:');
    if (optionText) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: { questionId: question.id, optionText },
      });
      setOptionDrafts({});
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <div className={styles['add-option']}>
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
              className={styles['question-input']}
            />
            <button onClick={handleSave} className={styles['save-btn']}>
              Save
            </button>
            <button onClick={handleCancel} className={styles['cancel-btn']}>
              Cancel
            </button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={optionDrafts[index] ?? option}
                      onChange={(e) =>
                        setOptionDrafts({
                          ...optionDrafts,
                          [index]: e.target.value,
                        })
                      }
                      className={styles['option-input']}
                    />
                    <div className={styles['option-actions']}>
                      <button
                        onClick={() => handleSaveOption(index)}
                        className={styles['option-edit-btn']}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDeleteOption(index)}
                        disabled={question.options.length <= 2}
                        className={styles['option-delete-btn']}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button
              onClick={handleAddOption}
              className={styles['add-option-btn']}
            >
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
