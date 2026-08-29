/**
 * Synthesized Web Audio API sound effects for F1 telemetry interactions.
 * Safe, zero external file dependencies, low latency.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Default muted for unobtrusive UX

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playBeep(880, 0.08); // Confirmation high beep
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  /**
   * Simple tone beep
   */
  public playBeep(freq = 440, duration = 0.1, type: OscillatorType = "sine", gainVal = 0.08) {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * 5 Red Lights sequence beep
   */
  public playLightBeep(isGreen = false) {
    if (this.isMuted) return;
    if (isGreen) {
      // Green light high pitch chime
      this.playBeep(1200, 0.25, "triangle", 0.12);
    } else {
      // Red light warning pip
      this.playBeep(650, 0.08, "square", 0.04);
    }
  }

  /**
   * DRS Zone activation chime
   */
  public playDRSChime() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Ignore
    }
  }

  /**
   * Pit Radio Beep
   */
  public playRadioStatic() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Two quick walkie-talkie beeps
      const now = ctx.currentTime;
      this.playBeep(1760, 0.04, "sine", 0.05);
      setTimeout(() => {
        this.playBeep(1318.5, 0.05, "sine", 0.05);
      }, 50);
    } catch {
      // Ignore
    }
  }

  /**
   * Quick telemetry button hover/click
   */
  public playClick() {
    if (this.isMuted) return;
    this.playBeep(400, 0.02, "sine", 0.03);
  }
}

export const sfx = new SoundEffectsManager();

