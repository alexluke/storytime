define ->
    class Timer
        @in: (ms, func) ->
            setTimeout func, ms
