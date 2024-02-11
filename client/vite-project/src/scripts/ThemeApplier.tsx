export class ThemeApplier {
    applyTheme(backgroundTheme: string, accentColor: string) {
        document.querySelector('body')?.setAttribute('data-theme', backgroundTheme);
        document.querySelector('body')?.setAttribute('data-accent', accentColor);
    }
}
