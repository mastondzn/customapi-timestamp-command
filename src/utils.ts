export const makeTimestamp = (now: Date, then: Date) => {
    const diff = now.getTime() - then.getTime();

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60 / 60 - hours) * 60);
    const seconds = Math.floor(
        ((diff / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );

    const humanReadable = `${hours ? hours + 'h' : ''} ${
        minutes ? minutes + 'm' : ''
    } ${seconds ? seconds + 's' : ''}`.trim();
    const queryParameter = `${hours ? hours + 'h' : ''}${
        minutes ? minutes + 'm' : ''
    }${seconds ? seconds + 's' : ''}`.trim();

    if (queryParameter === '') throw new Error('Could not parse timestamp');

    return { humanReadable, queryParameter };
};
