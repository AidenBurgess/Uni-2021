import styles from './SortButton.module.css';

export default function SortButton({ prop, mode, onClick }) {

    let text, reminder;

    switch (mode) {
        case 'asc':
            text = '▲';
            reminder = 'Sorting in ascending order. Click to sort in descending order.';
            break;
        case 'desc':
            text = '▼';
            reminder = 'Sorting in descending order. Click to remove sort.';
            break;
        default:
            text = '⬍';
            reminder = 'Not sorting. Click to sort in ascending order.';
            break;
    }

    return (
        <span title={reminder} className={styles.sortButton} onClick={() => {
            onClick(prop, mode === 'asc' ? 'desc' : mode === 'desc' ? 'none' : 'asc');
        }}>
            {text}
        </span>
    );
}