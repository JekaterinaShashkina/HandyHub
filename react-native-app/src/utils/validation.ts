export function isValidEmail(value: string) {
  const email = value.trim().toLowerCase();
  const emailPattern = /^[a-z0-9._%+-]{2,}@[a-z0-9-]+(\.[a-z0-9-]+)+$/i;

  if (!emailPattern.test(email)) {
    return false;
  }

  const [localPart, domainPart] = email.split('@');
  const domainLabels = domainPart.split('.');
  const topLevelDomain = domainLabels[domainLabels.length - 1];

  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return false;
  }

  return (
    domainLabels.every(
      (label) =>
        label.length >= 2 &&
        label.length <= 63 &&
        !label.startsWith('-') &&
        !label.endsWith('-')
    ) &&
    /^[a-z]{2,}$/i.test(topLevelDomain)
  );
}
