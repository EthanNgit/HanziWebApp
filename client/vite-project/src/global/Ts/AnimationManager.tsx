export class AnimationManager {
    setStreakFireAnimation(userCorrectStreak: number, setFireAnimationName: React.Dispatch<React.SetStateAction<string>>) {
        // Streak 1: 5 correct, Streak 2: 20 correct...
        if (userCorrectStreak !== undefined) {
            if (userCorrectStreak >= 100) {
                setFireAnimationName('streak-animation-max');
            } else if (userCorrectStreak >= 50) {
                setFireAnimationName('streak-animation-high');
            } else if (userCorrectStreak >= 20) {
                setFireAnimationName('streak-animation-med');
            } else if (userCorrectStreak >= 5) {
                setFireAnimationName('streak-animation-min');
            } else {
                setFireAnimationName('');
            }
        }
    }
}
